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
    <div className="py-5">
      <p className="text-bold">{post?.title}</p>
      <Image src="" alt="" width={200} height={200} className="mt-3 rounded-xl" />
      <p className="mt-3">{post?.content}</p>
    </div>
  );
};

export default PostingDetailPost;
