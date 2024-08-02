import LoginButton from '@/components/LoginPage/SocialLogin';
import Link from 'next/link';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Link href={'/'}>
        <header className="p-6">Logo</header>
      </Link>
      <div className="flex flex-col items-center justify-center flex-1">
        <h2 className="text-2xl font-bold mb-4">Health Protect me</h2>
        <p className="text-gray-500">지금 로그인하고 나만의 맞춤 식단을 시작하세요!</p>
        <p className="text-gray-500 mb-8">나의 건강 목표를 쉽게 달성할 수 있습니다</p>
        <LoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
