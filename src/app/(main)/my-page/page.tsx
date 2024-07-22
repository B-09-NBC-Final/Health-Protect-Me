import React from 'react';
import MyPage from '@/components/MyPage';
import MainLayout from '@/app/(main)/layout';

const MyPageComponent: React.FC = () => {
  return (
    <MainLayout>
      <MyPage />
    </MainLayout>
  );
};

export default MyPageComponent;
