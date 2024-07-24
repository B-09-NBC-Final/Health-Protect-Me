import { Database } from '@/types/supabase';
<<<<<<< HEAD
import { createServerClient } from '@supabase/ssr';
=======
import { createServerClient, type CookieOptions } from '@supabase/ssr';
>>>>>>> 592cda7a167c4df8159ebaba77c6fe4764669263
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {}
        }
      }
    }
  );
}
