import React from 'react';
import Header from '@/components/Common/Header/Header';
import Footer from '@/components/Common/Footer';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <main className="pt-15 bg-default">
          <div className="max-w-[1440px] px-10 py-10 my-0 mx-auto min-h-main-height sm:max-w-[360px] sm:px-5 sm:py-4 sm:min-h-mobile-main-height">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
