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

const ILLUSTRATION_STROKE = 'fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"';

function productIllustrationSVG(type) {
  const shapes = {
    hoodie: `
      <path ${ILLUSTRATION_STROKE} d="M32 26 C32 12 68 12 68 26"/>
      <path ${ILLUSTRATION_STROKE} d="M28 40 L32 26 L38 30 L50 26 L62 30 L68 26 L72 40 L64 46 L64 88 L36 88 L36 46 Z"/>
      <rect ${ILLUSTRATION_STROKE} x="40" y="58" width="20" height="14" rx="2"/>
      <path ${ILLUSTRATION_STROKE} d="M46 34 L46 46 M54 34 L54 46"/>`,
    bomber: `
      <path ${ILLUSTRATION_STROKE} d="M30 34 L50 26 L70 34 L76 44 L66 50 L66 86 L34 86 L34 50 L24 44 Z"/>
      <path ${ILLUSTRATION_STROKE} d="M42 28 L50 34 L58 28"/>
      <path ${ILLUSTRATION_STROKE} d="M50 34 L50 84"/>
      <path ${ILLUSTRATION_STROKE} d="M34 80 L64 80"/>`,
    tee: `
      <path ${ILLUSTRATION_STROKE} d="M30 30 L42 22 L50 28 L58 22 L70 30 L78 42 L66 48 L66 84 L34 84 L34 48 L22 42 Z"/>
      <path ${ILLUSTRATION_STROKE} d="M42 22 Q50 32 58 22"/>`,
    joggers: `
      <rect ${ILLUSTRATION_STROKE} x="34" y="16" width="32" height="8" rx="2"/>
      <path ${ILLUSTRATION_STROKE} d="M34 24 L34 60 L30 88 L44 88 L48 60 L52 60 L56 88 L70 88 L66 60 L66 24 Z"/>
      <path ${ILLUSTRATION_STROKE} d="M31 82 L43 82 M57 82 L69 82"/>`,
    track: `
      <path ${ILLUSTRATION_STROKE} d="M30 34 L50 26 L70 34 L76 44 L66 50 L66 86 L34 86 L34 50 L24 44 Z"/>
      <path ${ILLUSTRATION_STROKE} d="M50 34 L50 84"/>
      <path ${ILLUSTRATION_STROKE} d="M40 54 L50 64 L60 54" stroke-width="4.5"/>
      <path ${ILLUSTRATION_STROKE} d="M40 66 L50 76 L60 66" stroke-width="4.5"/>`,
    windbreaker: `
      <path ${ILLUSTRATION_STROKE} d="M36 30 C36 18 64 18 64 30"/>
      <path ${ILLUSTRATION_STROKE} d="M30 38 L36 30 L50 36 L64 30 L70 38 L76 48 L66 54 L66 82 L34 82 L34 54 L24 48 Z"/>
      <path ${ILLUSTRATION_STROKE} d="M34 82 Q40 87 46 82 Q52 87 58 82 Q64 87 66 82"/>`,
    wristband: `
      <circle ${ILLUSTRATION_STROKE} cx="50" cy="54" r="30"/>
      <circle ${ILLUSTRATION_STROKE} cx="50" cy="54" r="17"/>
      <rect ${ILLUSTRATION_STROKE} x="41" y="14" width="18" height="16" rx="3"/>`,
    cap: `
      <path ${ILLUSTRATION_STROKE} d="M20 56 Q50 20 80 56 Z"/>
      <path ${ILLUSTRATION_STROKE} d="M18 56 Q50 70 82 56 L82 61 Q50 75 18 61 Z"/>
      <circle cx="50" cy="30" r="2.5" fill="currentColor"/>`,
    backpack: `
      <rect ${ILLUSTRATION_STROKE} x="26" y="30" width="48" height="58" rx="10"/>
      <rect ${ILLUSTRATION_STROKE} x="34" y="58" width="32" height="22" rx="6"/>
      <path ${ILLUSTRATION_STROKE} d="M36 30 Q30 14 42 10 M64 30 Q70 14 58 10"/>
      <path ${ILLUSTRATION_STROKE} d="M42 24 Q50 16 58 24"/>`,
    beanie: `
      <path ${ILLUSTRATION_STROKE} d="M28 56 Q28 18 50 18 Q72 18 72 56 Z"/>
      <rect ${ILLUSTRATION_STROKE} x="26" y="56" width="48" height="14" rx="4"/>
      <circle ${ILLUSTRATION_STROKE} cx="50" cy="13" r="5"/>`,
    keychain: `
      <circle ${ILLUSTRATION_STROKE} cx="34" cy="24" r="10"/>
      <path ${ILLUSTRATION_STROKE} d="M44 30 L50 40"/>
      <rect ${ILLUSTRATION_STROKE} x="38" y="42" width="24" height="42" rx="6"/>
      <path ${ILLUSTRATION_STROKE} d="M42 54 L58 54 M42 64 L58 64"/>`,
    "belt-bag": `
      <path ${ILLUSTRATION_STROKE} d="M26 42 Q26 30 50 30 Q74 30 74 42 L74 78 Q74 88 50 88 Q26 88 26 78 Z"/>
      <path ${ILLUSTRATION_STROKE} d="M20 40 Q50 18 80 40"/>
      <rect ${ILLUSTRATION_STROKE} x="42" y="50" width="16" height="18" rx="2"/>`,
    figure: `
      <circle ${ILLUSTRATION_STROKE} cx="50" cy="26" r="13"/>
      <path ${ILLUSTRATION_STROKE} d="M50 39 L50 60 M50 46 L30 40 M50 46 L70 40 M50 60 L34 82 M50 60 L66 82"/>
      <ellipse ${ILLUSTRATION_STROKE} cx="50" cy="88" rx="22" ry="5"/>`,
    pins: `
      <circle ${ILLUSTRATION_STROKE} cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="2.5" fill="currentColor"/>
      <circle ${ILLUSTRATION_STROKE} cx="68" cy="32" r="12"/>
      <circle cx="68" cy="32" r="2.5" fill="currentColor"/>
      <circle ${ILLUSTRATION_STROKE} cx="32" cy="68" r="12"/>
      <circle cx="32" cy="68" r="2.5" fill="currentColor"/>
      <circle ${ILLUSTRATION_STROKE} cx="68" cy="68" r="12"/>
      <circle cx="68" cy="68" r="2.5" fill="currentColor"/>`,
    poster: `
      <rect ${ILLUSTRATION_STROKE} x="20" y="14" width="60" height="76" rx="2"/>
      <circle ${ILLUSTRATION_STROKE} cx="64" cy="30" r="5"/>
      <path ${ILLUSTRATION_STROKE} d="M26 72 L36 50 L44 62 L52 40 L60 58 L68 46 L74 72"/>`,
    diorama: `
      <rect ${ILLUSTRATION_STROKE} x="14" y="20" width="72" height="60" rx="3"/>
      <rect ${ILLUSTRATION_STROKE} x="22" y="46" width="14" height="28"/>
      <rect ${ILLUSTRATION_STROKE} x="40" y="34" width="14" height="40"/>
      <rect ${ILLUSTRATION_STROKE} x="58" y="50" width="14" height="24"/>
      <circle ${ILLUSTRATION_STROKE} cx="66" cy="30" r="5"/>
      <path ${ILLUSTRATION_STROKE} d="M66 35 L66 42"/>`,
  };

  return `
  <svg viewBox="0 0 100 100" class="icon-illustration" aria-hidden="true">
    ${shapes[type] || ""}
  </svg>`;
}

function productMediaHTML(p) {
  if (p.image) {
    return `<img src="${p.image}" alt="${p.name}" class="product-photo" loading="lazy" />`;
  }
  if (p.illustration) {
    return productIllustrationSVG(p.illustration);
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
