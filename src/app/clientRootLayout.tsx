'use client';

import './globals.css';
import { useUserStore } from '@/store/userStore';
import { createClient } from '@/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
  const { user, setUser, clearUser } = useUserStore((state) => state);
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();
      if (error) {
        console.error('Error checking session:', error);
      } else if (session) {
        setUser({
          userId: session.user.id,
          email: session.user.email,
          profile_url: session.user.user_metadata?.avatar_url || '',
          nickname: session.user.user_metadata?.nickname || '',
          is_survey_done: session.user.user_metadata?.is_survey_done || false
        });
      } else {
        clearUser();
        router.push('/login');
      }
      setLoading(false);
    };
    checkSession();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser({
          userId: session.user.id,
          email: session.user.email,
          profile_url: session.user.user_metadata?.avatar_url || '',
          nickname: session.user.user_metadata?.nickname || '',
          is_survey_done: session.user.user_metadata?.is_survey_done || false
        });
      } else {
        clearUser();
        router.push('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, setUser, clearUser, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
