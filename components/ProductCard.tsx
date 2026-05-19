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
    <Link href={`/product/${product.slug}`} className="block group">
      <article className="product-card bg-surface overflow-hidden border border-gold/10">
        {/* Image */}
        <div className="relative aspect-[3/4] bg-cream overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name[locale]}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 33vw"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/placeholder-wood.jpg';
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category badge */}
          <span className="absolute top-3 left-3 bg-cream/90 text-charcoal text-[10px] tracking-[0.12em] uppercase font-semibold px-2.5 py-1">
            {CATEGORY_LABELS[product.category] ?? product.category}
          </span>

          {/* View label on hover */}
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gold text-charcoal text-[10px] tracking-[0.15em] uppercase font-bold px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 whitespace-nowrap">
            Подробнее
          </span>
        </div>

        {/* Info */}
        <div className="p-4 border-t border-gold/10">
          <h3 className="font-display text-sm font-semibold text-charcoal leading-snug line-clamp-1">
            {product.name[locale]}
          </h3>
          <p className="text-[11px] text-charcoal/50 mt-0.5 tracking-wide line-clamp-1">
            {product.subtitle[locale]}
          </p>
          <div className="flex items-center justify-between mt-2.5">
            <p className="text-walnut font-bold text-sm">
              {formatPrice(product.pricePerM2)}
            </p>
            <p className="text-charcoal/40 text-[11px]">
              {t('currency')} {t('product.price_per_m2')}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
