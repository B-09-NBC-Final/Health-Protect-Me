'use client';
import React from 'react';
import Image from 'next/image';
import { signInWithGoogle } from '../../../supabase/auth/googleAuth';
import { signInWithKakao } from '../../../supabase/auth/kakaoAuth';
import googleLoginBtn from '@/assets/image/google_login_btn.png';
import kakaoLoginBtn from '@/assets/image/kakao_login_btn.png';

const LoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error during sign-in: ', error);
    }
  };

  const handleKakaoLogin = async () => {
    try {
      await signInWithKakao();
    } catch (error) {
      console.error('Error during sign-in: ', error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 ">
      <Image
        onClick={handleKakaoLogin}
        src={kakaoLoginBtn}
        alt="Kakao Login"
        width={320}
        height={52}
        className="mb-4 cursor-pointer"
      />
      <Image
        onClick={handleGoogleLogin}
        src={googleLoginBtn}
        alt="Google Login"
        width={320}
        height={52}
        className="cursor-pointer "
      />
    </div>
  );
};

export default LoginButton;
