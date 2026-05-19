'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useT, formatPrice } from '@/lib/i18n';
import type { Product } from '@/data/products';

interface Props {
  product: Product;
}

const CATEGORY_LABELS: Record<string, string> = {
  parquet: 'Массив',
  engineered: 'Инженерная',
  laminate: 'Ламинат',
  spc: 'SPC',
};

export default function ProductCard({ product }: Props) {
  const { t, locale } = useT();

  return (
    <Link href={`/product/${product.slug}`} className="block">
      <article className="product-card bg-surface rounded-2xl overflow-hidden shadow-sm border border-gold/10">
        <div className="relative aspect-[4/3] bg-cream">
          <Image
            src={product.images[0]}
            alt={product.name[locale]}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/placeholder-wood.jpg';
            }}
          />
          <span className="absolute top-2 left-2 bg-walnut/80 text-cream text-xs px-2 py-0.5 rounded-full">
            {CATEGORY_LABELS[product.category] ?? product.category}
          </span>
        </div>
        <div className="p-3">
          <h3 className="font-display text-sm font-semibold text-charcoal leading-snug line-clamp-2">
            {product.name[locale]}
          </h3>
          <p className="text-xs text-charcoal/60 mt-0.5 line-clamp-1">
            {product.subtitle[locale]}
          </p>
          <p className="mt-2 text-walnut font-bold text-sm">
            {formatPrice(product.pricePerM2)} {t('currency')} {t('product.price_per_m2')}
          </p>
        </div>
      </article>
    </Link>
  );
}
