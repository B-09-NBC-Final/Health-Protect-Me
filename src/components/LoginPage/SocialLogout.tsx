'use client';

import { useUserStore } from '@/store/userStore';
import { createClient } from '@/supabase/client';
import { useRouter } from 'next/navigation';

const SignOutButton = () => {
  const { clearUser } = useUserStore((state) => state);
  const router = useRouter();
  const supabase = createClient();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    clearUser();
    router.push('/');
  };
  return <button onClick={signOut}>로그아웃</button>;
};

export default SignOutButton;
