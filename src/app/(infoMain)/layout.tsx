import React from 'react';
import Header from '@/components/Common/Header/Header';
import Footer from '@/components/Common/Footer';

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
