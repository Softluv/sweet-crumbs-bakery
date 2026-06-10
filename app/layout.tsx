import type {Metadata} from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';
import './globals.css'; // Global styles

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sweet Crumbs Bakery | Premium Cakes & Pastries',
  description: 'Handcrafted cakes, artisan bread, and luxury designer desserts made with love and the finest ingredients.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen bg-brand-cream text-brand-chocolate selection:bg-brand-gold/30 selection:text-brand-chocolate" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

