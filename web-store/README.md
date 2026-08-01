# WEBSTRIKE — Spider-Hero Streetwear Store

A standalone static storefront (no build step, no framework) for **WEBSTRIKE**,
an original spider-hero themed streetwear/accessories/collectibles brand.
All names, copy, and iconography here are original — this is deliberately
**not** a Spider-Man/Marvel-branded store, since that IP can't legitimately be
used to sell products without a license.

## Running locally

No install needed — it's plain HTML/CSS/JS. From this folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just open `index.html` directly in a browser (all assets are relative;
note the cart uses `localStorage`, which some browsers restrict under the
`file://` scheme, so the local server is the more reliable option).

## Structure

- `index.html` — home page (hero, category tiles, featured products, newsletter signup)
- `shop.html` — full catalog with category filtering (`?category=apparel|accessories|collectibles`)
- `product.html?id=<product-id>` — product detail page (size/qty selection, add to cart)
- `cart.html` — cart with quantity controls, subtotal, and a mock checkout button
- `about.html` — brand story
- `contact.html` — contact form (front-end only) + shipping/returns/tracking info
- `js/products.js` — product catalog data
- `js/cart.js` — cart state, persisted to `localStorage`
- `js/icons.js` — original SVG iconography (spider mark, web pattern, category glyphs)
- `js/main.js` — nav toggle + newsletter form behavior
- `css/styles.css` — all styling (dark theme, crimson/black palette)

## What's real vs. mocked

- **Real**: product browsing/filtering, cart add/update/remove, persisted cart
  across page loads and sessions (via `localStorage`), responsive layout,
  contact form validation.
- **Mocked**: checkout (no payment processor is wired up — the button shows a
  notice), newsletter/contact form submissions (no backend — they just show a
  success state client-side).

## Extending it

To wire up real checkout/payments, orders, or a CMS-backed catalog, this
would need a backend (e.g. Stripe Checkout, or a platform like Shopify) —
happy to build that next if useful.
