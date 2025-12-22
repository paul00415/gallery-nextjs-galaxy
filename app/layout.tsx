import type { Metadata } from 'next';
import StoreProvider from './StoreProvider';
import HeroProvider from './HeroProvider';
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
          <StoreProvider>{children}</StoreProvider>
        </HeroProvider>
      </body>
    </html>
  );
}
