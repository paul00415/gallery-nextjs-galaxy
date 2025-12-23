import type { Metadata } from 'next';
import StoreProvider from './StoreProvider';
import HeroProvider from './HeroProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gallery App',
  description: 'A simple gallery application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HeroProvider>
          <StoreProvider>
            <Header />
            <main className="mt-20 mb-22">{children}</main>
            <Footer />
          </StoreProvider>
        </HeroProvider>
      </body>
    </html>
  );
}
