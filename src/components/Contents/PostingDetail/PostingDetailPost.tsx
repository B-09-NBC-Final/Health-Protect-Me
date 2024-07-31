'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createClient } from '@/supabase/client';
import { Post, User } from '@/types';
import Defaultimg from '@/assets/image/defaultimg.png';

const PostingDetailPost = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const supabase = createClient();
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const postDate = new Date(post?.created_at as string);
  const postYear = String(postDate.getFullYear()).slice(-2);
  const postMonth = String(postDate.getMonth() + 1).padStart(2, '0');
  const postDay = String(postDate.getDate()).padStart(2, '0');
  const dateOnly = `${postYear}.${postMonth}.${postDay}`;
  const defaultImageUrl = Defaultimg;

  const getPost = async () => {
    const { data: getPost, error } = await supabase.from('posts').select('*').eq('id', id).single();

    if (error) {
      console.log('error', error);
      return;
    }
    setPost(getPost);
  };

  const getUser = async (userId: string) => {
    const { data: getUser, error } = await supabase.from('users').select('*').eq('user_id', userId).single();

    if (error) {
      console.log('error', error);
    } else {
      setUser(getUser);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    if (post?.user_id) {
      getUser(post.user_id);
    }
  }, [post]);

  return (
    <>
      <div>
        <p className="font-bold border-b-2 border-solid border-coral pb-1 mb-5">{post?.title}</p>
        <Image src={post?.image_url[0] as string} alt="" width={200} height={200} className="mb-3 rounded-xl" />
        <p className="mb-5">{post?.content}</p>
        {post?.image_url[1] ? (
          <Image src={post?.image_url[1] as string} alt="" width={200} height={200} className="mb-3 rounded-xl" />
        ) : null}
        {post?.image_url[2] ? (
          <Image src={post?.image_url[2] as string} alt="" width={200} height={200} className="mb-3 rounded-xl" />
        ) : null}
      </div>

      <div className="flex border-y-2 border-solid border-coral py-5 mt-5">
        <Image
          src={user?.profile_url ? (user?.profile_url as string) : defaultImageUrl}
          alt=""
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex flex-col ml-5">
          <strong>{user?.nickname}</strong>
          <span>{dateOnly}</span>
        </div>
      </div>
    </>
  );
};

export default PostingDetailPost;
