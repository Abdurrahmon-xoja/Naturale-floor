import Image from 'next/image';
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import HomeClient from '@/components/HomeClient';
import { products } from '@/data/products';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HomeClient />
        <ProductGrid products={products} />
        <AboutSection />
        <FooterSection />
      </main>
    </>
  );
}

function AboutSection() {
  return (
    <section id="about" className="border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-5 py-14 md:py-20 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Text */}
        <div>
          <span className="block w-12 h-px bg-gold mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-6 leading-tight">
            О Natural<br />Floor UZ
          </h2>
          <p className="text-charcoal/65 leading-relaxed text-[0.9375rem] mb-4">
            Natural Floor UZ — собственное производство натуральных напольных покрытий в Узбекистане. Контролируем каждый этап: от выбора древесины до финишной обработки. Без посредников и импортных наценок — то, что вы видите в шоуруме, мы делаем сами.
          </p>
          <p className="text-charcoal/65 leading-relaxed text-[0.9375rem] mb-8">
            В нашем шоуруме в Ташкенте — более 50 образцов под одним светом: подойдите, потрогайте, сравните вживую. Рядом с каждым образцом — QR-код. Отсканируйте его телефоном, чтобы увидеть характеристики, примерить покрытие в своей комнате через AR или пройтись по шоуруму в формате 360°.
          </p>
          <a
            href="https://instagram.com/natural_floor.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-walnut hover:text-gold transition-colors duration-200 text-sm font-semibold tracking-wide"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            @natural_floor.uz
          </a>
        </div>

        {/* Visual — logo mark on warm card */}
        <div className="relative bg-charcoal aspect-square flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.06]"
            aria-hidden
            style={{
              backgroundImage:
                'repeating-linear-gradient(88deg, transparent, transparent 50px, rgba(201,166,107,1) 50px, rgba(201,166,107,1) 51px)',
            }}
          />
          <Image
            src="/logo.png"
            alt="Natural Floor UZ"
            width={280}
            height={88}
            className="relative brightness-0 invert w-3/4 h-auto object-contain opacity-90"
          />
          <div className="absolute bottom-6 left-6 right-6 border-t border-gold/20 pt-4">
            <p className="text-gold/60 text-[10px] tracking-[0.2em] uppercase">
              Crafted for Perfection · Tashkent
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer id="footer" className="bg-charcoal text-cream/60">
      {/* Top gold bar */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Image
            src="/logo.png"
            alt="Natural Floor UZ"
            width={140}
            height={44}
            className="h-8 w-auto object-contain brightness-0 invert opacity-80 mb-4"
          />
          <p className="text-xs leading-relaxed text-cream/40">
            Собственное производство натуральных напольных покрытий в Узбекистане
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60 font-semibold mb-4">Меню</p>
          <ul className="space-y-2.5">
            {[
              { href: '/#catalog', label: 'Каталог' },
              { href: '/#about',   label: 'О нас' },
              { href: '/#footer',  label: 'Контакты' },
            ].map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="text-xs hover:text-cream transition-colors">{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60 font-semibold mb-4">Контакты</p>
          <ul className="space-y-2.5 text-xs">
            <li>Ташкент, ул. Паркетная, 12</li>
            <li>+998 90 000-00-00</li>
            <li>
              <a
                href="https://instagram.com/natural_floor.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/70 hover:text-gold transition-colors"
              >
                @natural_floor.uz
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60 font-semibold mb-4">Соцсети</p>
          <a
            href="https://instagram.com/natural_floor.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs hover:text-cream transition-colors"
          >
            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            Instagram
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/5 max-w-7xl mx-auto px-5 py-5">
        <p className="text-[10px] text-cream/25 tracking-wide">
          © 2025 Natural Floor UZ. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
