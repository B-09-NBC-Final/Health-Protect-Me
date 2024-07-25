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
        <h2 className="text-2xl font-bold mb-4">로그인</h2>
        <p className="text-gray-500 mb-8">UX Writing</p>
        <LoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
