'use client';

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
      {/* Sticky compact header */}
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-gold/20">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link
            href="/"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-gold/20 transition-colors"
            aria-label="Назад"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <span className="font-display font-bold text-walnut text-lg truncate flex-1">
            Natural Floor UZ
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto pb-16">
        {/* Gallery */}
        <ProductGallery images={product.images} alt={product.name[locale]} />

        <div className="px-4 pt-5">
          {/* Name & subtitle */}
          <h1 className="font-display text-2xl font-bold text-charcoal leading-tight">
            {product.name[locale]}
          </h1>
          <p className="text-charcoal/60 text-sm mt-1">{product.subtitle[locale]}</p>
          <p className="text-walnut font-bold text-xl mt-2">
            {formatPrice(product.pricePerM2)} {t('currency')} {t('product.price_per_m2')}
          </p>

          {/* AR + Tour buttons */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            {product.modelGlb ? (
              <Link
                href={`/product/${product.slug}/ar`}
                className="flex items-center justify-center gap-2 min-h-[52px] bg-walnut text-cream font-semibold rounded-2xl hover:bg-walnut/90 transition-colors text-sm"
              >
                📱 {t('product.try_ar')}
              </Link>
            ) : (
              <button
                disabled
                title={t('product.ar_soon')}
                className="flex items-center justify-center gap-2 min-h-[52px] bg-charcoal/10 text-charcoal/40 font-semibold rounded-2xl text-sm cursor-not-allowed"
              >
                📱 {t('product.try_ar')}
              </button>
            )}

            {product.tourUrl ? (
              <Link
                href={`/product/${product.slug}/tour`}
                className="flex items-center justify-center gap-2 min-h-[52px] bg-gold text-charcoal font-semibold rounded-2xl hover:bg-gold/90 transition-colors text-sm"
              >
                🏠 {t('product.tour_360')}
              </Link>
            ) : (
              <button
                disabled
                title={t('product.tour_soon')}
                className="flex items-center justify-center gap-2 min-h-[52px] bg-charcoal/10 text-charcoal/40 font-semibold rounded-2xl text-sm cursor-not-allowed"
              >
                🏠 {t('product.tour_360')}
              </button>
            )}
          </div>

          {/* Specs */}
          <section className="mt-8">
            <h2 className="font-display text-lg font-semibold text-charcoal mb-3">
              {t('product.specs')}
            </h2>
            <dl className="divide-y divide-gold/20 rounded-2xl overflow-hidden border border-gold/20 bg-surface">
              {[
                { label: t('product.material'), value: product.material },
                { label: t('product.thickness'), value: `${product.thicknessMm} мм` },
                { label: t('product.plank_size'), value: product.plankSize },
                { label: t('product.color'), value: product.color },
                { label: t('product.surface'), value: product.surface },
                { label: t('product.origin'), value: product.originCountry },
                {
                  label: t('product.price'),
                  value: `${formatPrice(product.pricePerM2)} ${t('currency')} ${t('product.price_per_m2')}`,
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between px-4 py-3 gap-4">
                  <dt className="text-sm text-charcoal/60 flex-shrink-0">{label}</dt>
                  <dd className="text-sm text-charcoal font-medium text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Description */}
          <section className="mt-8">
            <h2 className="font-display text-lg font-semibold text-charcoal mb-3">
              {t('product.description')}
            </h2>
            <div className="text-charcoal/80 text-sm leading-relaxed space-y-3">
              {product.description[locale].split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="mt-8">
            <h2 className="font-display text-lg font-semibold text-charcoal mb-1">
              {t('product.contact_manager')}
            </h2>
            <ContactButton productName={product.name[locale]} productUrl={productUrl} />
          </section>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="font-display text-lg font-semibold text-charcoal mb-4">
                {t('product.related')}
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {related.slice(0, 3).map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
