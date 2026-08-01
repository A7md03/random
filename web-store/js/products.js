/* WEBSTRIKE product catalog. All names/art are original — no third-party IP. */

const PRODUCTS = [
  // Apparel
  {
    id: "crimson-web-hoodie",
    name: "Crimson Web Hoodie",
    category: "apparel",
    price: 68,
    colorway: ["#1a0507", "#7a0f1a"],
    icon: "mask",
    badge: "Bestseller",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Heavyweight fleece hoodie with an oversized web-crack print across the back and a ribbed spider-mark patch on the chest. Built for cold rooftops and colder streets.",
  },
  {
    id: "wall-runner-bomber",
    name: "Wall-Runner Bomber Jacket",
    category: "apparel",
    price: 128,
    colorway: ["#0a0a0c", "#c21528"],
    icon: "mask",
    badge: "New",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Water-resistant shell, quilted lining, and a reflective web-line seam that lights up under headlights. Zips high enough to disappear into a crowd.",
  },
  {
    id: "night-patrol-tee",
    name: "Night Patrol Tee",
    category: "apparel",
    price: 32,
    colorway: ["#0a0a0c", "#3a3a3f"],
    icon: "mask",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "100% combed cotton tee with a faded city-skyline web print. Pre-shrunk, garment-dyed, and softer with every wash.",
  },
  {
    id: "web-trace-joggers",
    name: "Web-Trace Joggers",
    category: "apparel",
    price: 58,
    colorway: ["#111114", "#8a1420"],
    icon: "mask",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Tapered fleece joggers with zip cargo pockets and a thin web-trace stripe down each leg. Elastic cuffs keep them out of the way mid-swing.",
  },
  {
    id: "alleyway-track-jacket",
    name: "Alleyway Track Jacket",
    category: "apparel",
    price: 88,
    colorway: ["#1a0507", "#e0161f"],
    icon: "mask",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Full-zip track jacket in signature crimson-and-black, with a woven spider-mark chenille patch and ribbed cuffs.",
  },
  {
    id: "rooftop-windbreaker",
    name: "Rooftop Windbreaker",
    category: "apparel",
    price: 96,
    colorway: ["#0a0a0c", "#5c5c63"],
    icon: "mask",
    badge: "New",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Packable windbreaker that folds into its own chest pocket. Taped seams, drawcord hem, printed web-crack lining.",
  },

  // Accessories
  {
    id: "web-shooter-wristband",
    name: "Web-Shooter Wristbands (2-Pack)",
    category: "accessories",
    price: 18,
    colorway: ["#1a0507", "#c21528"],
    icon: "web",
    sizes: ["One Size"],
    description:
      "Molded wristbands with a raised web-cartridge detail. Adjustable strap, matte finish, sold as a pair.",
  },
  {
    id: "crimson-web-snapback",
    name: "Crimson Web Snapback",
    category: "accessories",
    price: 34,
    colorway: ["#0a0a0c", "#c21528"],
    icon: "web",
    badge: "Bestseller",
    sizes: ["One Size"],
    description:
      "Structured 6-panel snapback with an embroidered spider-mark and underbrim web print.",
  },
  {
    id: "web-sling-backpack",
    name: "Web-Sling Backpack",
    category: "accessories",
    price: 74,
    colorway: ["#111114", "#3a3a3f"],
    icon: "web",
    sizes: ["One Size"],
    description:
      "20L daypack with a padded laptop sleeve, quick-access chest strap, and a debossed web-crack front panel.",
  },
  {
    id: "night-vision-beanie",
    name: "Night Vision Beanie",
    category: "accessories",
    price: 24,
    colorway: ["#0a0a0c", "#7a0f1a"],
    icon: "web",
    sizes: ["One Size"],
    description:
      "Ribbed knit beanie with a woven spider-mark cuff patch. Warm enough for stakeouts on the ledge.",
  },
  {
    id: "web-cartridge-keychain",
    name: "Web Cartridge Keychain",
    category: "accessories",
    price: 12,
    colorway: ["#1a0507", "#c21528"],
    icon: "web",
    sizes: ["One Size"],
    description:
      "Die-cast keychain shaped like a web-cartridge, with a matte black finish and clip-on ring.",
  },
  {
    id: "patrol-utility-belt-bag",
    name: "Patrol Utility Belt Bag",
    category: "accessories",
    price: 46,
    colorway: ["#0a0a0c", "#5c5c63"],
    icon: "web",
    badge: "New",
    sizes: ["One Size"],
    description:
      "Cross-body utility bag with modular pouches and a quick-release buckle. Built to carry the essentials on the move.",
  },

  // Collectibles
  {
    id: "rooftop-sentinel-vinyl",
    name: "Rooftop Sentinel Vinyl Figure",
    category: "collectibles",
    price: 45,
    colorway: ["#1a0507", "#c21528"],
    icon: "figure",
    sizes: ["One Size"],
    description:
      "5-inch vinyl figure in a crouched rooftop pose, cast in matte crimson and black with a numbered base.",
  },
  {
    id: "web-slinger-pin-set",
    name: "Web-Slinger Enamel Pin Set",
    category: "collectibles",
    price: 16,
    colorway: ["#0a0a0c", "#c21528"],
    icon: "figure",
    sizes: ["One Size"],
    description:
      "Set of 4 hard-enamel pins — spider-mark, web-cartridge, mask outline, and skyline silhouette.",
  },
  {
    id: "city-nights-poster",
    name: "City Nights Poster Print",
    category: "collectibles",
    price: 22,
    colorway: ["#111114", "#3a3a3f"],
    icon: "figure",
    sizes: ["18x24 in"],
    description:
      "Giclée print of a rooftop skyline at night, screen-printed in two-tone crimson and black on matte stock.",
  },
  {
    id: "limited-web-diorama",
    name: "Limited Edition Web Diorama",
    category: "collectibles",
    price: 110,
    colorway: ["#0a0a0c", "#7a0f1a"],
    icon: "figure",
    badge: "Limited",
    sizes: ["One Size"],
    description:
      "Hand-painted rooftop diorama with a web-strung centerpiece, numbered and limited to 500 pieces worldwide.",
  },
];

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function getProductsByCategory(category) {
  if (!category || category === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}
