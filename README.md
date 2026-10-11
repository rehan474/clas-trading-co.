# Clas Trading Co. website

Arabic-first bilingual wholesale showcase for شركة كلاس التجارية. Established 2018. Owned brands: Lamees, Top Clas, Baby 4 You. This is an enquiry website: no checkout, customer accounts or public wholesale pricing.

## Run locally

Install a current Node LTS supported by the locked Nuxt version. Run `npm install`, copy `.env.example` to `.env`, then `npm run dev`. Use `npm run build` and `npm run preview` to inspect the production output. Run the package's typecheck and dependency audit commands before release. Keep keys out of source control.

## Content

`content/products.json` is the combined catalog; `content/products/*.json` are individual editable copies. Keep them synchronized or adopt a single-source content loader before adding entries. Each product has slug, code, bilingual `name`, `description`, `fabric`, `care`, brand slug or null, type, gender, ageRange, sizes, image and isSample. Bilingual strings use `{ "ar": "...", "en": "..." }`. Never publish an unverified fabric claim, size, price or certification. Real supplied references include LA-12037, LA-12045, LA-12046, LA-12049 and HS-025. Other reference codes require confirmation.

`brands.json`, `faq.json`, `sizes.json`, `instagram.json`, `reviews.json` and `blog.json` separate content from presentation. Blog bodies contain heading/text sections per language. Posts marked planned are title-only. Empty reviews deliberately prevent fabricated testimonials. Size measurements are null until confirmed. The neutral catalog structure can later be mapped to Sanity or Strapi without changing page concepts.

## Logos, images and animation

Replace files in `public/brand/`: logo-parent.svg, logo-brand-a.svg, logo-brand-b.svg and logo-brand-c.svg; corresponding PNG names provide fallbacks. Display the brand logo as its name; preserve accessible text alternatives. Set the design accent variable to the owner's approved logo green. Keep SVG markup free of scripts and external references. The provided raster photos remain the source of product truth; generated styling imagery is promotional and can change details. Do not use it as a guaranteed depiction of stock.

Use descriptive filenames in `public/images/products/`. Provide dimensions and bilingual alt text. Add properly licensed supplementary lifestyle images only; Pinterest is an inspiration source, not a blanket commercial image license. Record source URL and applicable permission. Manual Instagram content links to the owner's profile; a future Graph API integration should run server-side with tokens stored as secrets and explicit account permission.

For 3D, place compressed models in `public/models/` and keep the total transfer small. A photo cannot establish a true 360-degree model; supply actual multi-angle frames for any product spinner. Reduced-motion, Save-Data and unavailable WebGL require static fallbacks. Check cleanup, off-screen rendering and maximum pixel ratio before introducing new canvas effects.

## Contact and analytics

Configure a verified Resend sender and Turnstile credentials. Send enquiries to clasintl676@gmail.com. Fail closed when spam verification or mail credentials are missing. Test server-side validation, honeypot, request limits, network failure and success. Distributed deployment needs a shared rate-limit store; process-memory limits alone do not span server instances. Do not log full message bodies or verification tokens.

Analytics must load only after affirmative consent. Declining analytics must preserve all core features. Verify WhatsApp, call, directions, successful form and brand-view events without including phone numbers, email addresses or message content in event properties.

## Deploy to Vercel

Import the project from your repository, select the Nuxt framework preset and deploy a preview first. Set environment values in the hosting dashboard, separately for preview and production. Add clastradingcompany.com and the chosen www alias; copy the DNS records actually shown by Vercel. Redirect the secondary hostname to the canonical hostname. Check TLS before enforcing HSTS. Validate `/ar` and `/en`, canonical/hreflang output, sitemap and robots on the real deployment before connecting search tools.

## Email DNS

Gmail is the receiving mailbox. Do not publish a made-up SPF record for the custom domain simply because the inbox is Gmail. Add the exact SPF and DKIM records returned by your sending provider. Maintain only one SPF policy per hostname and merge authorized senders correctly. Configure DMARC at `_dmarc`, start with monitoring and a report mailbox you control, then tighten policy after verifying legitimate mail alignment. Test a real delivered enquiry for SPF, DKIM and DMARC results.

## Operations and privacy

The privacy copy is a draft for owner review: confirm retention, enquiry access, analytics processors and any cross-border processing arrangements against actual operations. Limit access to enquiries; use 2FA and roles on hosting, mail, CMS and domain registrar. Enable registrar lock. Back up content and original assets outside the deployment; test restore before launch. Keep dependency updates and audit checks in regular maintenance. Optional Cloudflare WAF rules should protect form abuse without blocking legitimate Saudi buyers; configure known proxy forwarding before relying on client IP.

## Pre-launch checks

- Replace or remove every item in PLACEHOLDERS.md; remove illustrative sample products or label them visibly.
- Confirm all business data and exact Maps pin with the owner. No office photo was provided.
- Test Arabic RTL and English navigation, keyboard focus, skip link, mobile menu and slider controls.
- Check iPhone Safari and Android Chrome, reduced motion, slow 4G and keyboard-only operation.
- Confirm every CTA uses 966553100383 and private-quote wholesale wording.
- Verify Saturday–Thursday 10 AM–8 PM, closed Friday, and no appointment required.
- Test real delivered contact mail, validation failures, abuse handling and consent behavior.
- Inspect structured data; omit unknown geo, CR and fabricated offers, reviews or product ratings.
- Measure production mobile Lighthouse and Core Web Vitals. Targets are not verified guarantees.
- Check bilingual metadata, redirects, 404, sitemap, robots and social previews.

## Build and hosting modes
`npm run build` creates a static preview for Sites. This preview has no contact API runtime: use WhatsApp, call or email. `npm run build:server` creates the complete Nuxt server application for Vercel, including `/api/contact`. The contact form requires verified Resend + Turnstile keys and sender before it can send. Never put secrets in Git.

## Visuals and motion
The promotional hero was generated using the built-in image tool from the supplied clothing photos: floating garments on pastel plinths, realistic fabric, no people. It is an illustrative promotional image; the basketball graphic does not exactly reproduce its reference. Original product images remain the product references. Pinterest was researched for composition inspiration; no Pinterest assets were copied. Unsplash nursery options were researched but no stock images were imported.
The hero has smooth crossfades, pause and manual controls, and stops automatic movement for reduced-motion preferences. Lenis and GSAP are disabled for reduced motion / Save Data. A small lazy client-only TresJS primitive scene is removed off-screen and capped at DPR 2. No GLB assets currently exist.
Use `frames` arrays of 8–24 source images with `ProductSpinner` for genuine sequence rotation. No back views are invented from single photographs. Size illustration is schematic and measurements are unconfirmed.

## Logo files
Parent and Lamees use original PNGs. Top Clas is a hand-recreated black vector and Baby 4 You is a traced black vector. Verify vector fidelity before production. Replace matching files in `public/brand/`; brand data points to their paths. Accent `--accent: #398900` is a manually selected approximation of the parent logo green.

## Verification limits
Mobile Lighthouse targets and iPhone Safari / Android Chrome / slow-4G behavior must be verified on actual devices before public launch. The map pin coordinates were decoded from the destination geocode in the owner’s Google Maps share link (21.482394,39.188728); the original share link remains the directions destination. CR, map review URL, measurements and production integration credentials remain pending.
