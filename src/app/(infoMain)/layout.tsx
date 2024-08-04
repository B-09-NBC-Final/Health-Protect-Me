import React from 'react';
import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer';

const InfoMainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative ">
        <Header />
        <main className="bg-default">
          <div  className="min-h-main-height">{children}</div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default InfoMainLayout;
