'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from '../../../../supabase/supabaseClient';
import { Post } from '@/types';

const PostingDetailPost = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [post, setPost] = useState<Post | null>(null);

  const getPost = async () => {
    const { data, error } = await supabase.from('posts').select().eq('id', id).single();
    setPost(data);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <p className="font-bold border-b-2 border-solid border-coral pb-1 mb-5">{post?.title}</p>
      <Image src={post?.image_url as string} alt="" width={200} height={200} className="mb-3 rounded-xl" />
      <p className="mb-5">{post?.content}</p>
    </div>
  );
};

export default PostingDetailPost;
