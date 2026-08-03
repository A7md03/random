/**
 * <photo-upload> — customer photo upload for custom-printed products.
 *
 * Wraps a `properties[...]` file input so the shopper can drop or browse for
 * an image, see it previewed inside a phone-case frame, nudge/zoom it into
 * position, and get told up front when a file is too big or too low
 * resolution to print well. The file itself is submitted by Shopify as a line
 * item property on /cart/add; the framing choices ride along in a hidden
 * `_` property so production can see how the customer wanted it laid out.
 */
if (!customElements.get('photo-upload')) {
  customElements.define(
    'photo-upload',
    class PhotoUpload extends HTMLElement {
      connectedCallback() {
        if (this.initialized) return;
        this.initialized = true;

        this.input = this.querySelector('[data-photo-input]');
        this.dropzone = this.querySelector('[data-photo-dropzone]');
        this.preview = this.querySelector('[data-photo-preview]');
        this.frame = this.querySelector('[data-photo-frame]');
        this.image = this.querySelector('[data-photo-image]');
        this.fileNameElement = this.querySelector('[data-photo-filename]');
        this.fileMetaElement = this.querySelector('[data-photo-filemeta]');
        this.errorElement = this.querySelector('[data-photo-error]');
        this.warningElement = this.querySelector('[data-photo-warning]');
        this.zoomInput = this.querySelector('[data-photo-zoom]');
        this.positionInput = this.querySelector('[data-photo-position]');
        this.removeButton = this.querySelector('[data-photo-remove]');
        this.adjustments = this.querySelector('[data-photo-adjustments]');

        this.required = this.dataset.required === 'true';
        this.maxBytes = (parseFloat(this.dataset.maxFileSize) || 20) * 1024 * 1024;
        this.minWidth = parseInt(this.dataset.minWidth, 10) || 0;
        this.minHeight = parseInt(this.dataset.minHeight, 10) || 0;
        this.extensions = (this.dataset.extensions || 'jpg,jpeg,png,webp,heic,heif')
          .split(',')
          .map((extension) => extension.trim().toLowerCase())
          .filter(Boolean);

        this.transform = { zoom: 1, x: 0, y: 0 };
        this.naturalRatio = 1;
        this.objectUrl = null;

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.bindEvents();
        this.connectForm();
      }

      /**
       * The block renders above the buy buttons, so the product form it feeds
       * may not exist yet when this element upgrades — retry once on the next
       * frame before giving up on the submit guard.
       */
      connectForm(retry = true) {
        this.form = this.closest('form') || document.getElementById(this.dataset.formId);
        this.productForm = this.closest('product-info')?.querySelector('product-form') || null;

        if (!this.form && retry) {
          requestAnimationFrame(() => this.connectForm(false));
          return;
        }

        this.form?.addEventListener('submit', this.onFormSubmit, true);
        this.updateGate();
      }

      disconnectedCallback() {
        this.releaseObjectUrl();
        this.unsubscribeVariantChange?.();
        this.form?.removeEventListener('submit', this.onFormSubmit, true);
      }

      bindEvents() {
        this.input?.addEventListener('change', () => this.onFileSelected(this.input.files?.[0]));
        this.removeButton?.addEventListener('click', () => this.clear());
        this.zoomInput?.addEventListener('input', () => this.onZoomChange());

        ['dragenter', 'dragover'].forEach((eventName) => {
          this.dropzone?.addEventListener(eventName, (event) => {
            event.preventDefault();
            this.dropzone.classList.add('photo-upload__dropzone--active');
          });
        });

        ['dragleave', 'dragend', 'drop'].forEach((eventName) => {
          this.dropzone?.addEventListener(eventName, () => {
            this.dropzone.classList.remove('photo-upload__dropzone--active');
          });
        });

        this.dropzone?.addEventListener('drop', (event) => {
          event.preventDefault();
          const file = event.dataTransfer?.files?.[0];
          if (!file) return;

          // Mirror the dropped file into the input so it is submitted with the form.
          const transfer = new DataTransfer();
          transfer.items.add(file);
          this.input.files = transfer.files;
          this.onFileSelected(file);
        });

        this.frame?.addEventListener('pointerdown', this.onPointerDown.bind(this));

        // Dawn re-enables the submit button after every variant change, so the
        // gate has to be re-applied once the new variant has rendered.
        if (typeof subscribe === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') {
          this.unsubscribeVariantChange = subscribe(PUB_SUB_EVENTS.variantChange, () => {
            requestAnimationFrame(() => this.updateGate());
          });
        }
      }

      /* ----------------------------------------------------------------- */
      /* File handling                                                      */
      /* ----------------------------------------------------------------- */

      onFileSelected(file) {
        this.hideMessage(this.errorElement);
        this.hideMessage(this.warningElement);

        if (!file) {
          this.clear();
          return;
        }

        const extension = file.name.split('.').pop()?.toLowerCase() || '';
        if (this.extensions.length && !this.extensions.includes(extension)) {
          this.reject(this.dataset.errorType);
          return;
        }

        if (file.size > this.maxBytes) {
          this.reject(this.dataset.errorSize);
          return;
        }

        this.releaseObjectUrl();
        this.objectUrl = URL.createObjectURL(file);
        this.file = file;

        const probe = new Image();
        probe.onload = () => {
          this.naturalRatio = probe.naturalWidth / probe.naturalHeight || 1;
          this.showPreview(file, probe.naturalWidth, probe.naturalHeight);
        };
        probe.onerror = () => {
          // Formats the browser cannot decode (HEIC on most desktops) still
          // upload fine — show the file card without a visual preview.
          this.naturalRatio = 1;
          this.showPreview(file, 0, 0);
        };
        probe.src = this.objectUrl;
      }

      showPreview(file, width, height) {
        const previewable = width > 0 && height > 0;

        if (this.image) {
          this.image.hidden = !previewable;
          if (previewable) this.image.src = this.objectUrl;
        }
        if (this.frame) this.frame.classList.toggle('photo-upload__frame--empty', !previewable);
        if (this.adjustments) this.adjustments.hidden = !previewable;

        if (this.fileNameElement) this.fileNameElement.textContent = file.name;
        if (this.fileMetaElement) {
          this.fileMetaElement.textContent = previewable
            ? `${width} × ${height} px · ${this.formatSize(file.size)}`
            : this.formatSize(file.size);
        }

        this.transform = { zoom: 1, x: 0, y: 0 };
        if (this.zoomInput) this.zoomInput.value = '1';
        this.applyTransform();

        if (this.preview) this.preview.hidden = false;
        this.dropzone?.classList.add('photo-upload__dropzone--compact');

        if (previewable && this.minWidth && this.minHeight && (width < this.minWidth || height < this.minHeight)) {
          this.showMessage(this.warningElement, this.dataset.warningResolution);
        }

        this.updateGate();
      }

      clear() {
        if (this.input) this.input.value = '';
        this.file = null;
        this.releaseObjectUrl();

        if (this.image) {
          this.image.removeAttribute('src');
          this.image.hidden = true;
        }
        if (this.preview) this.preview.hidden = true;
        if (this.positionInput) this.positionInput.disabled = true;
        this.dropzone?.classList.remove('photo-upload__dropzone--compact');

        this.hideMessage(this.errorElement);
        this.hideMessage(this.warningElement);
        this.updateGate();
      }

      reject(message) {
        this.clear();
        this.showMessage(this.errorElement, message);
      }

      get hasPhoto() {
        return Boolean(this.input?.files?.length);
      }

      /* ----------------------------------------------------------------- */
      /* Framing                                                            */
      /* ----------------------------------------------------------------- */

      onZoomChange() {
        this.transform.zoom = parseFloat(this.zoomInput.value) || 1;
        this.applyTransform();
      }

      onPointerDown(event) {
        if (!this.hasPhoto || this.image?.hidden) return;
        event.preventDefault();

        const rect = this.frame.getBoundingClientRect();
        const start = {
          clientX: event.clientX,
          clientY: event.clientY,
          x: this.transform.x,
          y: this.transform.y,
        };

        this.frame.setPointerCapture(event.pointerId);
        this.frame.classList.add('photo-upload__frame--dragging');

        const move = (moveEvent) => {
          this.transform.x = start.x + ((moveEvent.clientX - start.clientX) / rect.width) * 100;
          this.transform.y = start.y + ((moveEvent.clientY - start.clientY) / rect.height) * 100;
          this.applyTransform();
        };

        const stop = () => {
          this.frame.classList.remove('photo-upload__frame--dragging');
          this.frame.releasePointerCapture?.(event.pointerId);
          this.frame.removeEventListener('pointermove', move);
          this.frame.removeEventListener('pointerup', stop);
          this.frame.removeEventListener('pointercancel', stop);
        };

        this.frame.addEventListener('pointermove', move);
        this.frame.addEventListener('pointerup', stop);
        this.frame.addEventListener('pointercancel', stop);
      }

      /**
       * Clamps the pan so the photo can never be dragged past its own edge,
       * then writes the framing to CSS custom properties and to the hidden
       * line item property production reads.
       */
      applyTransform() {
        if (!this.frame || !this.image) return;

        const rect = this.frame.getBoundingClientRect();
        const frameRatio = rect.width / rect.height || 1;
        const zoom = this.transform.zoom;

        // With object-fit: cover the image already overflows on one axis.
        const coverWidth = this.naturalRatio > frameRatio ? rect.height * this.naturalRatio : rect.width;
        const coverHeight = this.naturalRatio > frameRatio ? rect.height : rect.width / this.naturalRatio;
        const overflowX = Math.max(0, coverWidth * zoom - rect.width) / 2;
        const overflowY = Math.max(0, coverHeight * zoom - rect.height) / 2;
        const limitX = rect.width ? (overflowX / rect.width) * 100 : 0;
        const limitY = rect.height ? (overflowY / rect.height) * 100 : 0;

        this.transform.x = Math.min(limitX, Math.max(-limitX, this.transform.x));
        this.transform.y = Math.min(limitY, Math.max(-limitY, this.transform.y));

        this.image.style.setProperty('--photo-upload-zoom', zoom);
        this.image.style.setProperty('--photo-upload-x', `${this.transform.x}%`);
        this.image.style.setProperty('--photo-upload-y', `${this.transform.y}%`);

        if (this.positionInput) {
          this.positionInput.disabled = !this.hasPhoto;
          this.positionInput.value = `zoom ${zoom.toFixed(2)}x, offset ${this.transform.x.toFixed(
            1
          )}% / ${this.transform.y.toFixed(1)}%, fill`;
        }
      }

      /* ----------------------------------------------------------------- */
      /* Add-to-cart gating                                                 */
      /* ----------------------------------------------------------------- */

      /**
       * Runs in the capture phase, so it fires before Dawn's own submit
       * handler on the same form and can stop the add to cart outright.
       */
      onFormSubmit(event) {
        if (!this.required || this.hasPhoto) return;

        event.preventDefault();
        event.stopImmediatePropagation();
        this.showMessage(this.errorElement, this.dataset.errorRequired);
        this.scrollIntoView({ behavior: 'smooth', block: 'center' });
        this.input?.focus({ preventScroll: true });
      }

      updateGate() {
        const blocked = this.required && !this.hasPhoto;
        const submitButton = this.form?.querySelector('.product-form__submit');

        this.classList.toggle('photo-upload--incomplete', blocked);
        this.productForm?.classList.toggle('product-form--photo-required', blocked);

        if (!submitButton || submitButton.hasAttribute('disabled')) return;
        if (blocked) {
          submitButton.setAttribute('aria-disabled', 'true');
        } else if (submitButton.getAttribute('aria-disabled') === 'true') {
          submitButton.removeAttribute('aria-disabled');
        }
      }

      /* ----------------------------------------------------------------- */
      /* Helpers                                                            */
      /* ----------------------------------------------------------------- */

      showMessage(element, message) {
        if (!element || !message) return;
        element.textContent = message;
        element.hidden = false;
      }

      hideMessage(element) {
        if (!element) return;
        element.textContent = '';
        element.hidden = true;
      }

      formatSize(bytes) {
        if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
        return `${Math.max(1, Math.round(bytes / 1024))} KB`;
      }

      releaseObjectUrl() {
        if (!this.objectUrl) return;
        URL.revokeObjectURL(this.objectUrl);
        this.objectUrl = null;
      }
    }
  );
}
