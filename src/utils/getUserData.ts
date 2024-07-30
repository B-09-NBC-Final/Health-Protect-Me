import { createClient } from '@/supabase/server';
import type { NextRequest } from 'next/server';

export const getAuthToken = async (req: NextRequest): Promise<string | undefined> => {
  const supabase = createClient();
  const authToken = await supabase.auth.getSession();

  return authToken.data.session?.access_token;
};
