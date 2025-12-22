import type { Metadata } from 'next';
import StoreProvider from './StoreProvider';
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
      <StoreProvider>
        <body>{children}</body>
      </StoreProvider>
    </html>
  );
}
