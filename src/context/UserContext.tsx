'use client';

import { createContext, useState } from 'react';
import { useEffect } from 'react';
import { createClient } from '@/supabase/client';

export const UserContext = createContext(null);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({
    userId: null,
    email: null,
    profileUrl: null,
    nickname: null
  });

  useEffect(() => {
    createClient().auth.onAuthStateChange((event, session) => {
      // createClient().from("User").select("*")
      setUser({
        userId: session?.user?.id || null,
        email: session?.user?.email || null,
        nickname: null,
        profileUrl: null
      });
    });
    // async function getUser() {
    //   const { data } = await createClient().auth.getUser();
    //   console.log({ data });
    //   setUser({
    //     userId: data.user?.id || null,
    //     email: data.user?.email || null,
    //     nickname: null,
    //     profileUrl: null
    //   });
    // }
  }, []);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export default UserProvider;
