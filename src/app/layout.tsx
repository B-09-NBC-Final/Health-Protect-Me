import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import UserProvider from '../providers/UserProveider';
import Provider from '@/providers/Provider';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: 'Health-Protect-Me',

  description: '헬스케어 전문가가 내 옆에!  나만을 위한 식단과 운동을 동시에 추천해주는 건강 관리',

  keywords: '맞춤식단, 운동, 다이어트, 건강관리, 온라인PT, 피트니스앱, 웰니스, 체중관리, AI, 칼로리',

  authors: [{ name: '서주환' }, { name: '윤희수' }, { name: '전인화' }, { name: '김택수' }],

  openGraph: {
    title: 'Health-Protect-Me',

    description: '헬스케어 전문가가 내 옆에!  나만을 위한 식단과 운동을 동시에 추천해주는 건강 관리',

    url: 'https://www.health-protect-me.store/',

    type: 'website',

    images: [
      {
        url: 'src/assets/image/og.png',
        width: 516,
        height: 504,
        alt: 'Health-Protect-Me.'
      }
    ]
  }
};

const inter = Inter({ subsets: ['latin'] });

const pretandard = localFont({
  src: './fonts/subset-PretendardVariable-Regular.woff2',
  weight: '400 900',
  display: 'swap',
  variable: '--font-pretendard'
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
