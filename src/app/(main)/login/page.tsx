import LoginButton from '@/components/LoginPage/SocialLogin';
import React from 'react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['800'],
  display: 'swap'
});

const LoginPage = () => {
  return (
    <div className="w-full flex flex-col justify-center ${montserrat.className}">
      <div className="flex flex-col">
        <div className="flex flex-col items-center pt-[120px] s:pt:0 leading-8 s:pt-[144px] s:pb-[188px] ">
          <h2 className="${montserrat.className} text-[32px] tracking-tighter font-bold mb-4 s:text-2xl s:tracking-tight">
            Health Protect me
          </h2>
          <p className="login_subtitle s:text-base font-normal tracking-tight">
            지금 로그인하고 나만의 맞춤 식단을 시작하세요!
          </p>
          <p className="login_subtitle pb-20 s:text-base font-normal tracking-tight s:pb-10">
            나의 건강 목표를 쉽게 달성할 수 있습니다
          </p>
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
