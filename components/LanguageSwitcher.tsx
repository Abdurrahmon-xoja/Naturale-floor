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
    <div className="flex items-center gap-1">
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLocale(code)}
          className={`min-w-[44px] min-h-[44px] flex items-center justify-center text-xs font-semibold rounded-md transition-colors ${
            locale === code
              ? 'bg-walnut text-cream'
              : 'text-charcoal/60 hover:text-walnut'
          }`}
          aria-label={`Switch to ${label}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
