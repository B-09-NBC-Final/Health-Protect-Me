import React from 'react';
import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        <div className="flex-none">
          <Header />
        </div>
        <div className="flex-grow flex flex-col justify-center items-center pt-15">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
