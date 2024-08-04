import LoginButton from '@/components/LoginPage/SocialLogin';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="w-full flex flex-col justify-center pt-[183px]">
      <div className="flex flex-col">
        <div className="flex flex-col items-center mb-20">
          <h2 className="login_title text-2xl font-bold mb-4">Health Protect me</h2>
          <p className="login_subtitle">지금 로그인하고 나만의 맞춤 식단을 시작하세요!</p>
          <p className="login_subtitle">나의 건강 목표를 쉽게 달성할 수 있습니다</p>
        </div>
        <LoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
