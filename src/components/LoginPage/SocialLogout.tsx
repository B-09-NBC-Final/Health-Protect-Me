'use client';

import { useRouter } from 'next/navigation';

const SignOutButton = () => {
  const router = useRouter();

  const signOut = async () => {
    const { error } = await Supabase.auth.signOut();
    router.push('/');
  };
  return <button onClick={signOut}>로그아웃</button>;
};

export default SignOutButton;
