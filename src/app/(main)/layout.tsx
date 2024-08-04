import React from 'react';
import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative min-h-screen">
        <Header />
        <main className="pt-15 bg-default">
          <div className="max-w-[1440px] px-10 py-10 my-0 mx-auto min-h-screen">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
