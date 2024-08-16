import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import UserProvider from '../providers/UserProveider';
import Provider from '@/providers/Provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="preload"
          href="/fonts/subset-PretendardVariable-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <Provider>
          <UserProvider>{children}</UserProvider>
        </Provider>
      </body>
    </html>
  );
}
