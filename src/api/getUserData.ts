import { createClient } from '@/supabase/server';

export const getAuthToken = async (): Promise<string | undefined> => {
  const supabase = createClient();
  const authToken = await supabase.auth.getSession();

  return authToken.data.session?.access_token;
};
