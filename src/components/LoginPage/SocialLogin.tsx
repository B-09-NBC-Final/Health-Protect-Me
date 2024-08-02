'use client';
import React from 'react';
import Image from 'next/image';
import googleLoginBtn from '@/assets/image/logo googleg.svg';
import kakaoLoginBtn from '@/assets/image/카카오 로고.svg';
import { signInWithGoogle } from '../../../supabase/auth/googleAuth';
import { signInWithKakao } from '../../../supabase/auth/kakaoAuth';

const LoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      const data = await signInWithGoogle();
      console.log('Signed in: ', data);
    } catch (error) {
      console.error('Error during sign-in: ', error);
    }
  };

  const handleKakaoLogin = async () => {
    try {
      const data = await signInWithKakao();
      console.log('Signed in: ', data);
    } catch (error) {
      console.error('Error during sign-in: ', error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 ">
      <button
        onClick={handleKakaoLogin}
        className="flex h-13 p-4 justify-center items-center gap-4 self-stretch bg-yellow-400 rounded-lg"
      >
        <Image src={kakaoLoginBtn} alt="Kakao Login" width={24} height={24} className="mr-2" />

        <span className="text-black ">카카오로 로그인하기</span>
      </button>
      <button
        onClick={handleGoogleLogin}
        className="flex h-13 p-4 justify-center items-center gap-4 self-stretch bg-black rounded-lg"
      >
        <Image src={googleLoginBtn} alt="Google Login" width={24} height={24} className="mr-2" />
        <span className="text-white">구글로 로그인하기</span>
      </button>
    </div>
  );
};

export default LoginButton;
