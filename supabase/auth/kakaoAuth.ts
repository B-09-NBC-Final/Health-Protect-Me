import { supabase } from '../supabaseClient';

export const signInWithKakao = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: 'https://qdtbndpvityeryaniyfj.supabase.co/auth/v1/callback'
    }
  });
  if (error) throw error;
  return data;
};
