import Header from '@/components/common/Header';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MainLayout;
