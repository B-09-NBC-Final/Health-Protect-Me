import { createClient } from '@/supabase/client';

export const signInWithKakao = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: 'https://qdtbndpvityeryaniyfj.supabase.co/auth/v1/callback'
    }
  });
  if (error) throw error;
  return data;
};
