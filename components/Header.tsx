'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useT } from '@/lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useT();

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-gold/15">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Natural Floor UZ"
            width={148}
            height={46}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: '/#catalog', label: t('nav.catalog') },
            { href: '/#about',   label: t('nav.about') },
            { href: '/#footer',  label: t('nav.contact') },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-xs tracking-[0.12em] uppercase font-semibold text-charcoal/50 hover:text-walnut transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
