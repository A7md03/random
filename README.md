# Many Things (أشياء كتير) — Shopify Theme

A bold, street/pop-art Shopify theme for **Many Things**, a Dubai-based brand
selling custom-printed phone cases and stickers. Built on Shopify's official
**Dawn** theme (Online Store 2.0, JSON templates + sections/blocks), reskinned
with a black / white / dark-red palette, Archivo Black display type, Work Sans
body type, sharp (0px radius) buttons/pills/badges, a floating WhatsApp
click-to-chat button, and a complete Arabic (RTL) translation.

## What's in here

- Standard Dawn folder layout: `layout/`, `sections/`, `snippets/`, `assets/`,
  `config/`, `templates/`, `locales/`.
- New sections built for this brand (Dawn has no equivalent):
  `sections/ugc-gallery.liquid` (Instagram/UGC image grid) and
  `sections/faq.liquid` (accordion FAQ).
- New snippets: `snippets/whatsapp-button.liquid` +
  `snippets/icon-whatsapp.liquid` (floating WhatsApp button, renders nothing
  to customers until a WhatsApp number is set in the theme customizer).
- **Customer photo upload** for custom-printed products —
  `snippets/photo-upload.liquid`, `assets/photo-upload.js`,
  `assets/component-photo-upload.css` and the `photo_upload` product block in
  `sections/main-product.liquid`. See "Custom phone cases" below.
- New page templates: `templates/page.about-us.json`,
  `templates/page.faq.json`, `templates/page.shipping-returns.json`,
  `templates/page.track-order.json`, plus a reskinned
  `templates/page.contact.json` with a WhatsApp CTA.
- `locales/ar.json` + `locales/ar.schema.json`: complete Arabic translation
  (every key from the English locale files has a matching Arabic key).

## Custom phone cases (customer photo upload)

Customers pick their own photo on the product page and it is attached to the
order — no app and no subscription. It uses Shopify's built-in support for
**file line item properties**: the file input posts to `/cart/add`, Shopify
stores the image on its CDN, and the link shows up on the cart, on the order
confirmation, and on the order in **Admin → Orders**, where you download it to
print.

What the customer gets on the product page:

- Drag and drop or browse for a photo.
- A live preview inside a phone-case frame with a camera cut-out and a dashed
  trim guide, so they can see what will be cropped.
- Drag to reposition and a zoom slider. The framing is saved with the order as
  a hidden `_Print position` property — customers never see it, but your team
  does on the order in the admin.
- Immediate, translated errors for files that are too big or the wrong type,
  and a soft warning when a photo is below the resolution you set (it still
  uploads — the customer is just told the print may look soft).
- An optional free-text note field ("Any instructions for us?").
- Add to cart is blocked until a photo is attached (this is a setting). The
  dynamic checkout button is blocked at the same time, since it would
  otherwise skip straight to checkout without the photo.

### Setting it up for a product

1. In **Admin → Products**, open the custom case product and set its theme
   template to **product.custom-case** (Online store → Theme template).
2. That template already has the upload block placed above the quantity
   selector, plus a "How Custom Printing Works" section and photo tips.
3. To change the wording, requirements or limits, open the product in the
   theme customizer and select the **Customer photo upload** block. To add it
   to any other product page, add that block from the customizer.

To make the block available on the *default* product template instead, add a
`photo_upload` block to `templates/product.json` the same way
`templates/product.custom-case.json` does — but note that would then ask every
product for a photo, including stickers.

### Limits worth knowing

- **20 MB per file** is Shopify's hard limit; the block's maximum is capped
  there. Modern phone photos are well under it, but a scan or a RAW export can
  exceed it — the customer gets a clear message rather than a failed add.
- **HEIC/HEIF** (the default iPhone format) uploads fine and is accepted, but
  most desktop browsers cannot decode it, so those customers see a file card
  without a visual preview. iPhones send JPEG through Safari in most cases.
- The customer can attach **one photo per cart line**. If they order two
  different cases, they add them separately — quantity 2 on one line means the
  same photo twice.
- The uploaded file is what gets printed; the zoom/position is guidance for
  your production team, not a server-side crop.

## Deploying

This environment has no Shopify CLI login or dev store connected. To push
this theme to the client's store, from a machine with the Shopify CLI
installed and network access to Shopify:

```bash
shopify login --store=<store-name>.myshopify.com
shopify theme push
```

Use `shopify theme push --unpublished` first if you want to review the theme
in the theme library before publishing it live, or `shopify theme dev` to
preview changes locally against the dev store before pushing.

## TODO before launch (client checklist)

- [ ] Set the real WhatsApp number in **Theme settings → WhatsApp** (format:
      country code + number, e.g. `9715XXXXXXXX`, no `+` or spaces). The
      floating WhatsApp button is hidden from customers until this is set.
- [ ] Replace the `https://wa.me/TODO_WHATSAPP_NUMBER` placeholder links on
      the Contact, Shipping & Returns, and Track My Order pages with the same
      real WhatsApp number (search the theme for `TODO_WHATSAPP_NUMBER`).
- [ ] Set social links in **Theme settings → Social media**.
- [ ] Assign the **product.custom-case** template to every product that is
      printed with the customer's own photo (**Admin → Products → [product] →
      Online store → Theme template**), then check the wording of the upload
      block in the theme customizer.
- [ ] Decide whether **Buy it now** should stay off on custom case products.
      It is off in `product.custom-case` on purpose: it skips the cart, and a
      customer who has not uploaded a photo yet would land straight in
      checkout.
- [ ] Add real product photos and copy — homepage, collection, and product
      pages currently use realistic **placeholder copy** (per the client's
      own instruction to use placeholders for now), and the About Us page
      copy is placeholder brand-story text pending the client's real story.
- [ ] Create the `phone-cases`, `stickers`, and `best-sellers` collections in
      **Admin → Products → Collections** — the homepage's featured-collection
      sections already reference these handles and will populate
      automatically once the collections exist.
- [ ] Enable Arabic as a published storefront language in
      **Admin → Settings → Languages** (see "Arabic / RTL" note below — the
      theme code is ready, but only the merchant can publish the locale).
- [ ] Assign the custom page templates to their pages in
      **Admin → Online Store → Pages**: create (or edit) the About Us, FAQ,
      Shipping & Returns, and Track My Order pages and set their theme
      template to `page.about-us`, `page.faq`, `page.shipping-returns`, and
      `page.track-order` respectively.
- [ ] Configure product filters (phone model, case type, color) in
      **Admin → Search & Discovery** — the collection page filtering UI is
      already built and styled, it just needs filter definitions from the
      merchant's product options/metafields.
- [ ] Add Privacy Policy / Terms of Service / Refund Policy text in
      **Admin → Settings → Policies** — the footer already links to whichever
      policies are filled in there.

## Known limitations (flagged deliberately, not oversights)

- **Track My Order page**: Shopify has no native public "enter your order
  number → see live tracking" widget without a paid app. Rather than fake
  one, `templates/page.track-order.json` explains that tracking links arrive
  by email, links to the customer's order history at `/account`, and offers
  the WhatsApp button as a manual fallback.
- **RTL coverage**: Arabic/RTL styling was prioritized for the header,
  footer, cart drawer, product page, and buttons — the areas customers hit
  most. Full pixel-perfect RTL parity across every single Dawn component
  (e.g. some less common sections, third-party app blocks) has not been
  audited and may have rough edges worth a follow-up pass once real Arabic
  content is in place.
- **Language switcher**: The switcher in the header/footer is Dawn's stock
  localization form, driven by `shop.published_locales`. It will only show
  English + Arabic once Arabic is published as a locale in
  **Admin → Settings → Languages** — no theme code can force this.
- **Collection filters**: Styled and functional, but the actual filter
  options (phone model, case type, color) depend on the merchant configuring
  matching product options/metafields in **Admin → Search & Discovery**.
