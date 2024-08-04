import React from 'react';
import Header from '@/components/common/Header/Header';

const InfoMainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative min-h-screen">
        <Header />
        <main className="pt-15 bg-default">{children}</main>
      </div>
    </>
  );
};

export default InfoMainLayout;
