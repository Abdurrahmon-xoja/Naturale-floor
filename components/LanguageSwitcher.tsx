'use client';

import { useT } from '@/lib/i18n';
import type { Locale } from '@/data/products';

const LOCALES: { code: Locale; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'uz', label: 'UZ' },
  { code: 'en', label: 'EN' },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useT();

  return (
    <div className="flex items-center divide-x divide-gold/20 border border-gold/20">
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLocale(code)}
          className={`min-w-[40px] min-h-[36px] flex items-center justify-center text-[10px] tracking-[0.15em] font-semibold transition-colors duration-200 ${
            locale === code
              ? 'bg-charcoal text-cream'
              : 'text-charcoal/40 hover:text-walnut bg-transparent'
          }`}
          aria-label={`Switch to ${label}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
