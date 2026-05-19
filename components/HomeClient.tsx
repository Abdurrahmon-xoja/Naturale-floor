'use client';

import Image from 'next/image';
import { useT } from '@/lib/i18n';

export default function HomeClient() {
  const { t } = useT();

  return (
    <section className="relative overflow-hidden bg-charcoal text-cream min-h-[55vh] flex items-center">
      {/* Wood grain texture overlay (CSS-only) */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(201,166,107,0.4) 40px, rgba(201,166,107,0.4) 41px)',
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'repeating-linear-gradient(175deg, transparent, transparent 80px, rgba(201,166,107,0.6) 80px, rgba(201,166,107,0.6) 81px)',
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-4 py-20">
        <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-6">
          Tashkent Showroom
        </p>
        <Image
          src="/logo.png"
          alt="Natural Floor UZ"
          width={320}
          height={100}
          className="h-20 w-auto object-contain mb-6 brightness-0 invert"
          priority
        />
        <p className="text-cream/70 text-lg md:text-xl max-w-xl mb-8">
          {t('hero.tagline')}
        </p>
        <a
          href="#catalog"
          className="inline-flex items-center min-h-[52px] px-8 bg-gold text-charcoal font-bold rounded-full hover:bg-gold/90 transition-colors text-sm tracking-wide"
        >
          {t('hero.cta')} →
        </a>
      </div>
    </section>
  );
}
