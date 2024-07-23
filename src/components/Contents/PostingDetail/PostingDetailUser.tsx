'use client';

import Image from 'next/image';
import { supabase } from '../../../../supabase/supabaseClient';
import { useEffect, useState } from 'react';
import { User } from '@/types';

const PostingDetailUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const getUser = async () => {
    const session = await supabase.auth.getSession();
    const isSignIn = !!session.data.session;
    console.log(isSignIn);
    // 로그인 상태 유지되면 추가하기
    // const { data, error } = await supabase.from('users').select('*').eq('user_id');
    // setUser(data)
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex border-y-2 border-solid border-coral py-5">
      <Image src="" alt="" width={50} height={50} className="rounded-full" />
      <div className="flex flex-col ml-5">
        <strong>닉네임</strong>
        <span>24.7.18</span>
      </div>
    </div>
  );
};

export default PostingDetailUser;
