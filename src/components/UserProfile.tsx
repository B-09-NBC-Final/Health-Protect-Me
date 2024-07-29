'use client';

import React, { useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { createClient } from '@/supabase/client';

const UserProfile = () => {
  const { user, setUser } = useUserStore();
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();

      if (data && data.user) {
        setUser({
          userId: data.user.id,
          email: data.user.email,
          profile_url: data.user?.user_metadata?.profile_url
        });
      }
    }
    getUser();
  }, []);
  console.log(user);

  return null;
};

export default UserProfile;
