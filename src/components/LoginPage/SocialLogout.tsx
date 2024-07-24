'use client';

import { createClient } from '@/supabase/client';
import { useRouter } from 'next/navigation';

const SignOutButton = () => {
  const router = useRouter();

  const signOut = async () => {
    const { error } = await createClient.auth.signOut();
    router.push('/');
  };
  return <button onClick={signOut}>로그아웃</button>;
};

export default SignOutButton;
