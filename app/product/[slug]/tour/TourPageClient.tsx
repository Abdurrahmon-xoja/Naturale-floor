'use client';

import Link from 'next/link';
import { useT } from '@/lib/i18n';
import TourViewer from '@/components/TourViewer';
import type { Product } from '@/data/products';

interface Props {
  product: Product;
}

function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

export default function TourPageClient({ product }: Props) {
  const { t } = useT();

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
          {t('tour.back')}
        </Link>
      </div>

      {/* Drag hint */}
      {product.tourUrl && !isExternalUrl(product.tourUrl) && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
          <span className="bg-black/50 backdrop-blur text-cream/80 px-4 py-2 rounded-full text-xs">
            {t('tour.drag')}
          </span>
        </div>
      )}

      <div className="flex-1 relative">
        {product.tourUrl ? (
          <TourViewer
            tourUrl={product.tourUrl}
            isExternal={isExternalUrl(product.tourUrl)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <span className="text-6xl mb-6">🏠</span>
            <h2 className="font-display text-2xl font-bold text-cream mb-3">
              {t('tour.title')}
            </h2>
            <p className="text-cream/60 text-sm max-w-xs">
              Тур для этого покрытия скоро будет доступен.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
