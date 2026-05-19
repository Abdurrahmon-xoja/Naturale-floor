'use client';

import Image from 'next/image';
import { useT } from '@/lib/i18n';

export default function HomeClient() {
  const { t } = useT();

  return (
    <section className="relative overflow-hidden bg-charcoal text-cream min-h-[92vh] flex flex-col justify-end">
      {/* Layered wood-grain lines */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(88deg, transparent, transparent 60px, rgba(201,166,107,1) 60px, rgba(201,166,107,1) 61px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(178deg, transparent, transparent 110px, rgba(201,166,107,1) 110px, rgba(201,166,107,1) 111px)',
          }}
        />
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,rgba(111,78,55,0.35),transparent)]" />
      </div>

      {/* Gold accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

      <div className="relative max-w-7xl mx-auto px-5 pb-20 pt-32 w-full">
        {/* Eyebrow */}
        <p className="text-gold/80 text-[10px] tracking-[0.3em] uppercase font-semibold mb-8">
          Tashkent · Showroom · Est. 2020
        </p>

        {/* Logo — white */}
        <Image
          src="/logo.png"
          alt="Natural Floor UZ"
          width={380}
          height={120}
          className="h-[72px] md:h-24 w-auto object-contain brightness-0 invert mb-8"
          priority
        />

        {/* Tagline */}
        <p className="text-cream/55 text-base md:text-lg max-w-md leading-relaxed mb-10 font-light">
          {t('hero.tagline')}
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#catalog"
            className="group inline-flex items-center gap-3 bg-gold text-charcoal font-semibold px-7 py-3.5 rounded-full hover:bg-gold/90 transition-all duration-300 text-sm tracking-wide"
          >
            {t('hero.cta')}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="/#about"
            className="text-cream/50 hover:text-cream text-sm tracking-wide transition-colors duration-200"
          >
            О нас
          </a>
        </div>

        {/* Stats row */}
        <div className="flex gap-10 mt-16 pt-8 border-t border-cream/10">
          {[
            { num: '50+', label: 'образцов в зале' },
            { num: 'AR', label: 'примерка на вашем полу' },
            { num: '360°', label: 'тур по шоуруму' },
          ].map(({ num, label }) => (
            <div key={num}>
              <p className="font-display text-2xl font-bold text-gold">{num}</p>
              <p className="text-cream/40 text-xs mt-1 tracking-wide">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
