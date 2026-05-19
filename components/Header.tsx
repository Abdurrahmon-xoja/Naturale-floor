'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useT } from '@/lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useT();

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-gold/20">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Natural Floor UZ"
            width={140}
            height={44}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-charcoal/80">
          <a href="/#catalog" className="hover:text-walnut transition-colors">{t('nav.catalog')}</a>
          <a href="/#about" className="hover:text-walnut transition-colors">{t('nav.about')}</a>
          <a href="/#footer" className="hover:text-walnut transition-colors">{t('nav.contact')}</a>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
