'use client';

import Link from 'next/link';
import { useT } from '@/lib/i18n';
import ARLauncher from '@/components/ARLauncher';
import type { Product } from '@/data/products';

interface Props {
  product: Product;
}

export default function ARPageClient({ product }: Props) {
  const { t, locale } = useT();

  return (
    <div className="fixed inset-0 bg-charcoal flex flex-col">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-20">
        <Link
          href={`/product/${product.slug}`}
          className="flex items-center gap-2 bg-black/50 backdrop-blur text-cream px-4 py-2 rounded-full text-sm font-semibold min-h-[44px]"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {t('ar.back')}
        </Link>
      </div>

      {/* Product name overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <span className="bg-black/50 backdrop-blur text-cream/90 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
          {product.name[locale]}
        </span>
      </div>

      {/* AR viewer or placeholder */}
      <div className="flex-1 relative">
        {product.modelGlb ? (
          <ARLauncher
            glbSrc={product.modelGlb}
            usdzSrc={product.modelUsdz}
            productName={product.name[locale]}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <span className="text-6xl mb-6">🪵</span>
            <h2 className="font-display text-2xl font-bold text-cream mb-3">
              {t('ar.preparing')}
            </h2>
            <p className="text-cream/60 text-sm max-w-xs">
              {t('ar.preparing_desc')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
