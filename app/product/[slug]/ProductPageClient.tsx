'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useT, formatPrice } from '@/lib/i18n';
import ProductGallery from '@/components/ProductGallery';
import ContactButton from '@/components/ContactButton';
import ProductCard from '@/components/ProductCard';
import { getRelatedProducts } from '@/data/products';
import type { Product } from '@/data/products';

interface Props {
  product: Product;
}

export default function ProductPageClient({ product }: Props) {
  const { t, locale } = useT();
  const related = getRelatedProducts(product);

  const productUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://naturalfloor.uz/product/${product.slug}`;

  return (
    <>
      {/* Sticky header */}
      <header
        className="header-blur sticky top-0 z-50 border-b border-gold/15 relative"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center gap-4">
          <Link
            href="/"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-walnut transition-colors"
            aria-label="Назад"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="w-px h-5 bg-gold/30" />
          <Image src="/logo.png" alt="Natural Floor UZ" width={120} height={38} className="h-7 w-auto object-contain" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto pb-24">

        {/* ── Desktop split / Mobile stack ── */}
        <div className="md:grid md:grid-cols-2 md:min-h-[85vh]">

          {/* Left — gallery (sticky on desktop) */}
          <div className="md:sticky md:top-16 md:self-start">
            <ProductGallery images={product.images} alt={product.name[locale]} />
          </div>

          {/* Right — info */}
          <div className="px-5 md:px-12 pt-8 md:pt-14 flex flex-col gap-8">

            {/* Eyebrow */}
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-semibold mb-3">
                {product.originCountry} · {product.category}
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight">
                {product.name[locale]}
              </h1>
              <p className="text-charcoal/50 text-sm mt-2 tracking-wide">
                {product.subtitle[locale]}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-walnut">
                {formatPrice(product.pricePerM2)}
              </span>
              <span className="text-charcoal/50 text-sm">
                {t('currency')} {t('product.price_per_m2')}
              </span>
            </div>

            {/* AR + Tour CTAs */}
            <div className="grid grid-cols-2 gap-3">
              {product.arUrl || product.modelGlb ? (
                <Link
                  href={`/product/${product.slug}/ar`}
                  className="group flex items-center justify-center gap-2.5 min-h-[54px] bg-charcoal text-cream font-semibold text-sm tracking-wide hover:bg-walnut transition-colors duration-300"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {t('product.try_ar')}
                </Link>
              ) : (
                <button disabled className="flex items-center justify-center gap-2 min-h-[54px] bg-charcoal/8 text-charcoal/30 text-sm font-semibold tracking-wide cursor-not-allowed">
                  {t('product.try_ar')}
                </button>
              )}

              {product.tourUrl ? (
                <Link
                  href={`/product/${product.slug}/tour`}
                  className="flex items-center justify-center gap-2.5 min-h-[54px] bg-gold text-charcoal font-semibold text-sm tracking-wide hover:bg-gold/85 transition-colors duration-300"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {t('product.tour_360')}
                </Link>
              ) : (
                <button disabled className="flex items-center justify-center gap-2 min-h-[54px] bg-charcoal/8 text-charcoal/30 text-sm font-semibold tracking-wide cursor-not-allowed">
                  {t('product.tour_360')}
                </button>
              )}
            </div>

            {/* Specs */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-charcoal/40 font-semibold mb-4">
                {t('product.specs')}
              </p>
              <dl className="divide-y divide-gold/15">
                {[
                  { label: t('product.material'),   value: product.material },
                  { label: t('product.thickness'),   value: `${product.thicknessMm} мм` },
                  { label: t('product.plank_size'),  value: product.plankSize },
                  { label: t('product.color'),       value: product.color },
                  { label: t('product.surface'),     value: product.surface },
                  { label: t('product.origin'),      value: product.originCountry },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-3 gap-4">
                    <dt className="text-xs text-charcoal/45 tracking-wide">{label}</dt>
                    <dd className="text-xs text-charcoal font-semibold text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Description */}
            <div>
              <span className="gold-rule mb-4" />
              <div className="prose-premium space-y-3">
                {product.description[locale].split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="pb-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-charcoal/40 font-semibold mb-3">
                {t('product.contact_manager')}
              </p>
              <ContactButton productName={product.name[locale]} productUrl={productUrl} />
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20 px-5">
            <div className="border-t border-gold/20 pt-12">
              <span className="gold-rule mb-4" />
              <h2 className="font-display text-2xl font-bold text-charcoal mb-8">
                {t('product.related')}
              </h2>
              <div className="grid grid-cols-2 gap-px bg-gold/10 sm:grid-cols-3">
                {related.slice(0, 3).map((p) => (
                  <div key={p.slug} className="bg-cream">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
