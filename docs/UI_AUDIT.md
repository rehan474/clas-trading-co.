# UI audit — 12 October 2026

Updated the wholesale CTA to a warm cream gradient with a burgundy button. Refined heading and paragraph spacing, Arabic line height, mobile size cards, FAQ text, journal cards, image captions, button wrapping and touch targets. Fixed the missing final carousel dot, repeated company suffix in SEO titles, and oversized brand logos on narrow screens. Added Escape handling to the mobile navigation and solid backgrounds when backdrop filters are unsupported.

## Browser coverage

Inspected 18 routes in Arabic and English at 360, 768 and 1440 pixel widths using Chromium in the in-app browser. Tablet and desktop checks passed for horizontal overflow, one H1 and accessible button names. Mobile checks identified overflow in the three brand detail logos in both languages; their width is now constrained to the available container. Other mobile routes passed those checks.

Final mobile logo and keyboard retests were interrupted by the local rate limiter and subsequently a browser connection error. These are not recorded as passes. Physical iPhone Safari and Android Chrome testing and a fresh Lighthouse run remain outstanding.

## Build validation

Run `npm run typecheck`, `npm run build:server`, and the static publishing build before release. No performance score or cross-browser certification is claimed by this audit.
