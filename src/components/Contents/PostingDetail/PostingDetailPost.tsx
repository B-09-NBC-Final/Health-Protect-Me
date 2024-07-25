'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createClient } from '@/supabase/client';
import { Post, User } from '@/types';

const PostingDetailPost = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const supabase = createClient();
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const getPost = async () => {
    const { data: getPost, error } = await supabase.from('posts').select('*').eq('id', id).single();

    if (error) {
      console.log('error', error);
      return;
    }
    setPost(getPost);

    const { data: getUser } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', post?.user_id as string)
      .single();

    if (error) {
      console.log('error', error);
    } else {
      setUser(getUser);
    }
  };
  console.log(post?.user_id);
  // const getUser = async () => {
  //   const session = await supabase.auth.getSession();
  //   const isSignIn = !!session.data.session;
  //   console.log(isSignIn);

  //   console.log('aaaa', post);

  // };
  useEffect(() => {
    getPost();
    // getUser();
  }, []);

  // console.log(user);

  return (
    <>
      <div>
        <p className="font-bold border-b-2 border-solid border-coral pb-1 mb-5">{post?.title}</p>
        <Image src={post?.image_url as string} alt="" width={200} height={200} className="mb-3 rounded-xl" />
        <p className="mb-5">{post?.content}</p>
      </div>

      <div className="flex border-y-2 border-solid border-coral py-5">
        <Image src="" alt="" width={50} height={50} className="rounded-full" />
        <div className="flex flex-col ml-5">
          <strong>{user?.nickname}</strong>
          <span>24.7.18</span>
        </div>
      </div>
    </>
  );
};

export default PostingDetailPost;
