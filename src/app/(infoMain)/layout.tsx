import React from 'react';
import Header from '@/components/common/Header/Header';

const InfoMainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />  
      {children}
    </>
  );
};

export default InfoMainLayout;