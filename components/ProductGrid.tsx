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
  { key: 'all',        labelKey: 'catalog.filter_all' },
  { key: 'parquet',    labelKey: 'catalog.filter_parquet' },
  { key: 'engineered', labelKey: 'catalog.filter_engineered' },
  { key: 'laminate',   labelKey: 'catalog.filter_laminate' },
  { key: 'spc',        labelKey: 'catalog.filter_spc' },
];

export default function ProductGrid({ products }: Props) {
  const { t } = useT();
  const [active, setActive] = useState<Filter>('all');

  const visible =
    active === 'all' ? products : products.filter((p) => p.category === active);

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-5 py-12">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
        <div>
          <span className="gold-rule mb-4" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
            {t('catalog.title')}
          </h2>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map(({ key, labelKey }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`min-h-[40px] px-5 text-xs tracking-[0.1em] uppercase font-semibold transition-all duration-200 border ${
                active === key
                  ? 'bg-charcoal text-cream border-charcoal'
                  : 'bg-transparent text-charcoal/50 border-charcoal/20 hover:border-walnut hover:text-walnut'
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-gold/10">
        {visible.map((product) => (
          <div key={product.slug} className="bg-cream">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
