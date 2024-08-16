import React from 'react';
import Header from '@/components/Common/Header/Header';
import Footer from '@/components/Common/Footer';

const InfoMainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <main className="pt-15 bg-default">
          <div className="max-w-[1440px] mx-auto min-h-main-height flex justify-center items-center px-10 py-10 my-0 m:max-w-container-m s:max-w-container-s xs:max-w-container-xs s:py-4 xs:px-5">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default InfoMainLayout;
