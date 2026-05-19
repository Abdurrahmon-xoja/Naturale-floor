# Natural Floor UZ

Mobile-first web app for **Natural Floor UZ** — a wooden flooring / parquet retailer in Tashkent. Customers scan a QR code on a showroom sample → land on the product card → launch AR preview or 360° tour.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · `<model-viewer>` · Pannellum · qrcode · pdfkit

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

### Generate placeholder assets (first run)

```bash
npx tsx scripts/generate-placeholder-glb.ts   # public/models/placeholder.glb
npm run placeholders                            # public/images/products/*.jpg + public/tours/showroom.jpg
npm run qr                                      # public/qr/*.png + public/qr/sheet.pdf
```

---

## Project structure

```
app/
  page.tsx                       # Home — hero + product grid + about + footer
  product/[slug]/
    page.tsx                     # Product card (SSG, the QR landing page)
    ProductPageClient.tsx        # Gallery, AR/Tour buttons, specs, contact
    ar/
      page.tsx + ARPageClient.tsx   # Full-screen model-viewer AR
    tour/
      page.tsx + TourPageClient.tsx # Full-screen Pannellum / iframe tour
components/
  Header.tsx                     # Sticky nav + LanguageSwitcher
  LanguageSwitcher.tsx           # RU / UZ / EN (persisted in localStorage)
  ProductGrid.tsx                # Filterable grid with category pills
  ProductCard.tsx                # Card used in grid + related products
  ProductGallery.tsx             # Swipeable thumbnail + main image
  ARLauncher.tsx                 # Wraps <model-viewer>
  TourViewer.tsx                 # Wraps Pannellum or renders iframe
  ContactButton.tsx              # WhatsApp + Telegram deep links
  HomeClient.tsx                 # Hero section (client, uses useT)
data/
  products.ts                    # Product data + helper functions
dictionaries/
  ru.json / uz.json / en.json    # i18n strings
lib/
  i18n.ts                        # useT() hook + formatPrice()
scripts/
  generate-qr.ts                 # QR PNG + printable A4 PDF
  generate-placeholders.ts       # Placeholder product images + panorama
  generate-placeholder-glb.ts   # Minimal placeholder GLB model
public/
  images/products/               # Product photos (placeholder JPEGs included)
  models/                        # placeholder.glb
  tours/                         # showroom.jpg (equirectangular panorama)
  qr/                            # Generated QR PNGs + sheet.pdf
```

---

## Adding a product

1. **Add entry to `data/products.ts`** — fill all required fields. Set `modelGlb` to `undefined` if no 3D model yet; the AR button will show as disabled with a "coming soon" tooltip.

2. **Add product images** to `public/images/products/{slug}-1.jpg`, `-2.jpg`, etc.

3. **(Optional)** Drop a real `{slug}.glb` + `{slug}.usdz` into `public/models/`.

4. **(Optional)** Set `tourUrl` to an external 360 URL (e.g. Matterport) or a local `/tours/{slug}.jpg`.

5. **Regenerate QR codes:**
   ```bash
   npm run qr
   ```
   Print `public/qr/sheet.pdf` and tape QRs to physical samples.

---

## Regenerating QR codes

```bash
# Development URLs (default)
npm run qr

# Production URLs
BASE_URL=https://naturalfloor.uz npm run qr
```

Output:
- `public/qr/{slug}.png` — high-res QR (1024×1024, error correction H)
- `public/qr/sheet.pdf` — printable A4 sheet, 6 QRs/page with product name

---

## i18n

Three locales: **RU** (default), **UZ**, **EN**. Strings live in `dictionaries/{locale}.json`. The language switcher persists the choice in `localStorage`.

To add a string:
1. Add the key/value to all three JSON files.
2. Call `t('your.key')` in any client component that calls `useT()`.

Product `name`, `subtitle`, and `description` are already multilingual objects (`Record<Locale, string>`).

---

## Deploy to Vercel

```bash
# Install Vercel CLI if needed
npm i -g vercel

vercel deploy
```

Set the environment variable in the Vercel dashboard:
```
BASE_URL=https://your-production-domain.uz
```

Then regenerate QRs locally with the production URL and redeploy or commit the generated files.

### Custom domain

In Vercel project settings → Domains → add your domain.

---

## WhatsApp / Telegram numbers

Update the `WA_NUMBER` constant and the Telegram handle in `components/ContactButton.tsx`.

---

## Tech notes

- **AR:** `<model-viewer>` handles iOS (Quick Look via `.usdz`) and Android (Scene Viewer / WebXR via `.glb`) with no app install.
- **360° tour:** Pannellum renders local equirectangular JPEGs. For external tours (Matterport, Uzbekistan360, etc.), set `tourUrl` to a full `https://...` URL — it renders in a fullscreen `<iframe>`.
- **Images:** All served from `/public` via Next.js `<Image>`. Placeholder JPEGs are included so the demo works immediately.
- **QR generation:** `qrcode` (error correction H, 1024px) + `pdfkit` A4 layout. No server needed — runs locally as a CLI script.
