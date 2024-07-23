'use client';

import React from 'react';
import Image from 'next/image';
import googleLoginBtn from '../../../public/image/googleLogin.png';
import { signInWithGoogle } from '../../../supabase/auth/googleAuth';

const LoginButton: React.FC = () => {
  const handleGoogleLogin = async () => {
    try {
      const data = await signInWithGoogle();
      console.log('Signed in: ', data);
    } catch (error) {
      console.error('Error during sign-in: ', error);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>
      <Image src={googleLoginBtn} alt="Google Login" width={200} height={50} />
    </button>
  );
};

export default LoginButton;
