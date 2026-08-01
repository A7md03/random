/* Original decorative iconography (no third-party marks). */

function spiderMarkSVG() {
  return `
  <svg viewBox="0 0 100 100" class="icon-spider" aria-hidden="true">
    <circle cx="50" cy="42" r="14" fill="currentColor"/>
    <circle cx="50" cy="64" r="20" fill="currentColor"/>
    <g stroke="currentColor" stroke-width="3.5" fill="none" stroke-linecap="round">
      <path d="M38 36 L10 20"/>
      <path d="M36 46 L6 44"/>
      <path d="M37 58 L8 68"/>
      <path d="M42 70 L20 90"/>
      <path d="M62 36 L90 20"/>
      <path d="M64 46 L94 44"/>
      <path d="M63 58 L92 68"/>
      <path d="M58 70 L80 90"/>
    </g>
  </svg>`;
}

function webCrackSVG() {
  return `
  <svg viewBox="0 0 200 200" class="icon-web" aria-hidden="true">
    <g stroke="currentColor" stroke-width="1" fill="none" opacity="0.55">
      <path d="M100 0 L100 200 M0 100 L200 100 M20 20 L180 180 M180 20 L20 180"/>
      <path d="M100 0 L60 40 L100 60 L140 40 Z"/>
      <circle cx="100" cy="100" r="30" />
      <circle cx="100" cy="100" r="60" />
      <circle cx="100" cy="100" r="90" />
    </g>
  </svg>`;
}

function productMediaHTML(p) {
  if (p.image) {
    return `<img src="${p.image}" alt="${p.name}" class="product-photo" loading="lazy" />`;
  }
  return spiderMarkSVG();
}

function categoryIcon(kind) {
  switch (kind) {
    case "mask":
      return `<svg viewBox="0 0 100 100" class="icon-glyph" aria-hidden="true">
        <path d="M50 12 C22 12 10 34 10 54 C10 76 28 90 50 90 C72 90 90 76 90 54 C90 34 78 12 50 12 Z" fill="none" stroke="currentColor" stroke-width="4"/>
        <path d="M28 46 L44 54 L28 62" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
        <path d="M72 46 L56 54 L72 62" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
      </svg>`;
    case "web":
      return `<svg viewBox="0 0 100 100" class="icon-glyph" aria-hidden="true">
        <g stroke="currentColor" stroke-width="3" fill="none">
          <path d="M50 6 L50 94 M6 50 L94 50 M17 17 L83 83 M83 17 L17 83"/>
          <circle cx="50" cy="50" r="16"/>
          <circle cx="50" cy="50" r="32"/>
        </g>
      </svg>`;
    case "figure":
      return `<svg viewBox="0 0 100 100" class="icon-glyph" aria-hidden="true">
        <circle cx="50" cy="28" r="14" fill="none" stroke="currentColor" stroke-width="4"/>
        <path d="M50 42 L50 72 M50 50 L28 40 M50 50 L72 40 M50 72 L32 92 M50 72 L68 92" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
      </svg>`;
    default:
      return spiderMarkSVG();
  }
}
