import { createClient } from '@/supabase/client';

export const signInWithGoogle = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://qdtbndpvityeryaniyfj.supabase.co/auth/v1/callback',
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    }
  });
  if (error) throw error;
  return data;
};
