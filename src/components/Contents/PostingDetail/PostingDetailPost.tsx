'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from '../../../../supabase/supabaseClient';
import { Post } from '@/types';

const PostingDetailPost = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [post, setPost] = useState<Post | null>(null);

  const getData = async () => {
    const { data, error } = await supabase.from('posts').select().eq('id', id).single();
    setPost(data);
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="py-5">
      {/* 디자인 나오면 공통 컴포넌트로 만들기 */}
      <strong className="bg-green-300 p-2">잡담</strong>
      <p className="text-bold mt-3">{post?.title}</p>
      <Image src={post?.image_url as string} alt="" width={200} height={200} className="mt-3 rounded-xl" />
      <p className="mt-3">{post?.content}</p>
    </div>
  );
};

export default PostingDetailPost;
