'use client';

import { useState } from 'react';
import { useT } from '@/lib/i18n';
import ProductCard from './ProductCard';
import type { Product } from '@/data/products';

interface Props {
  products: Product[];
}

type Filter = 'all' | 'parquet' | 'engineered' | 'laminate' | 'spc';

const FILTERS: { key: Filter; labelKey: string }[] = [
  { key: 'all', labelKey: 'catalog.filter_all' },
  { key: 'parquet', labelKey: 'catalog.filter_parquet' },
  { key: 'engineered', labelKey: 'catalog.filter_engineered' },
  { key: 'laminate', labelKey: 'catalog.filter_laminate' },
  { key: 'spc', labelKey: 'catalog.filter_spc' },
];

export default function ProductGrid({ products }: Props) {
  const { t } = useT();
  const [active, setActive] = useState<Filter>('all');

  const visible =
    active === 'all' ? products : products.filter((p) => p.category === active);

  return (
    <section id="catalog" className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="font-display text-3xl font-bold text-charcoal mb-6">
        {t('catalog.title')}
      </h2>

      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap mb-8">
        {FILTERS.map(({ key, labelKey }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`min-h-[44px] px-4 rounded-full text-sm font-medium transition-colors ${
              active === key
                ? 'bg-walnut text-cream'
                : 'bg-surface text-charcoal/70 hover:bg-gold/20 border border-gold/30'
            }`}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
