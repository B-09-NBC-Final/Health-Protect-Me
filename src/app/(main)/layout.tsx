import React from 'react';
import Header from '@/components/Common/Header/Header';
import Footer from '@/components/Common/Footer';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <main className="pt-15 bg-default">
          <div className="px-10 py-10 my-0 mx-auto min-h-main-height max-w-container-l m:max-w-container-m s:max-w-container-s xs:max-w-container-xs s:px-5">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
