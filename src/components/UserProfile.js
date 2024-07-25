'use client';

import React, { useEffect, useState } from 'react';
// import { useUserState, useUserDispatch, setUser, resetUser } from '../context/UserContext';
// import { fetchUser } from '../lib/supabase';
import { useUserStore } from './store/userStore';
import { createClient } from '@/supabase/client';

const UserProfile = () => {
  // const { userId, email, nickname, profileUrl } = useUserState();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  // 1. API 요청으로 현재 로그인한 정보를 가져온다.
  // 2. zustand의 user에 넣는다.

  useEffect(() => {
    async function getUser() {
      const { data } = await createClient().auth.getUser();

      // const { data: userData } = await createClient()
      //   .from('Users')
      //   .select('nickname, profileUrl')
      //   .eq('id', data.user.id);

      setUser({
        userId: data.user.id,
        email: data.user.email,
        nickname: null,
        profileUrl: null
      });
    }
    getUser();
  }, [setUser]);

  // const dispatch = useUserDispatch();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const loadUser = async () => {
  //     const userId = '유저 아이디'; // 실제 유저 아이디를 넣어주세요
  //     const userData = await fetchUser(userId);
  //     if (userData) {
  //       dispatch(
  //         setUser({
  //           userId: userData.user_id,
  //           email: userData.email,
  //           nickname: userData.nickname,
  //           profileUrl: userData.profile_url
  //         })
  //       );
  //     }
  //     setLoading(false);
  //   };

  //   loadUser();
  // }, [dispatch]);

  // if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* <h1>{nickname}</h1>
      <p>{email}</p>
      {profileUrl && <img src={profileUrl} alt="Profile" />} */}
    </div>
  );
};

export default UserProfile;
