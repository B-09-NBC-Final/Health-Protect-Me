import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import UserProvider from '../providers/UserProveider';
import Provider from '@/providers/Provider';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: 'Health_Protect_Me',
  description: '희수짱'
};

const inter = Inter({ subsets: ['latin'] });

const pretandard = localFont({
  src: './fonts/subset-PretendardVariable-Regular.woff2',
  weight: '400 900',
  display: 'swap',
  variable: '--font-pretentard'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${inter.className} ${pretandard.className}`}>
      <body>
        <Provider>
          <UserProvider>{children}</UserProvider>
        </Provider>
      </body>
    </html>
  );
}
