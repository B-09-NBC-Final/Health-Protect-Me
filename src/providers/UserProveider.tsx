'use client';

import LoadingPage from '@/components/LoadingPage/Loading';
import { useUserStore } from '@/store/userStore';
import { createClient } from '@/supabase/client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
  const { user, setUser, clearUser } = useUserStore((state) => state);
  const supabase = createClient();
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redicrectToLogin = () => {
      clearUser();

      if (pathname === '/' || pathname === '/login') {
        setLoading(false);
        return;
      }
    };

    const checkSession = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();
      if (error) {
        console.error('Error checking session:', error);
      } else if (session) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('nickname, profile_url')
          .eq('user_id', session.user.id)
          .single();

        if (userError) {
          console.error('Error fetching user data:', userError);
        } else {
          setUser({
            userId: session.user.id,
            email: session.user.email,
            profile_url: userData?.profile_url || '',
            nickname: session.user.user_metadata?.nickname || '',
            is_survey_done: session.user.user_metadata?.is_survey_done || false
          });
        }
      } else {
        redicrectToLogin();
      }
      setLoading(false);
    };

    checkSession();
  }, [supabase, setUser, clearUser, pathname, router]);

  if (loading) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}
