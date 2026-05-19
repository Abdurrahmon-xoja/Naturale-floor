import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Natural Floor UZ — Паркет и инженерная доска в Ташкенте',
  description:
    'Европейский паркет, инженерная доска, ламинат и SPC в Ташкенте. AR-примерка и 360° тур прямо в браузере.',
  openGraph: {
    title: 'Natural Floor UZ',
    description: 'Паркет и инженерная доска в Ташкенте',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {/* Fills the iPhone notch / Dynamic Island with the header background color */}
        <div
          aria-hidden
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: 'env(safe-area-inset-top)',
            backgroundColor: '#F5EFE6',
            zIndex: 9999,
          }}
        />
        {children}
      </body>
    </html>
  );
}
