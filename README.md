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
- New page templates: `templates/page.about-us.json`,
  `templates/page.faq.json`, `templates/page.shipping-returns.json`,
  `templates/page.track-order.json`, plus a reskinned
  `templates/page.contact.json` with a WhatsApp CTA.
- `locales/ar.json` + `locales/ar.schema.json`: complete Arabic translation
  (every key from the English locale files has a matching Arabic key).

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
