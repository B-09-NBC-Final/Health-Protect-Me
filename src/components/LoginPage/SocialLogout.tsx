'use client';

import { SupabaseClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const SignOutButton = () => {
  const router = useRouter();

  const signOut = async () => {
    const { error } = await SupabaseClient.auth.signOut();
    router.push('/');
  };
  return <button onClick={signOut}>로그아웃</button>;
};

export default SignOutButton;
