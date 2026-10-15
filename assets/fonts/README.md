# Fonts for generated images

Static TTF instances of the site fonts, read by `src/app/opengraph-image.tsx` and `src/app/apple-icon.tsx`
at build time. `ImageResponse` (Satori) cannot use the `next/font` files: it needs TTF/OTF/WOFF, not WOFF2.

| File | Font | Source |
|---|---|---|
| `CormorantGaramond-Medium.ttf`, `CormorantGaramond-MediumItalic.ttf` | Cormorant Garamond 500 | Google Fonts |
| `Onest-Regular.ttf`, `Onest-Medium.ttf` | Onest 400, 500 | Google Fonts |

Both families are licensed under the SIL Open Font License 1.1 (https://openfontlicense.org).
