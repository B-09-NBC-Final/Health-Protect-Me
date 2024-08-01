'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type PostData = {
  id: string;
  title: string;
  content: string;
  user_id: string;
  image_url: string[];
  created_at: string;
  category: string;
  updated_at: string;
};

const PostsSection = () => {
  const supabase = createClient();
  const router = useRouter();
  const [posts, setPosts] = useState<PostData[]>([]);

  const fetchPostData = async (): Promise<void> => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const isSignIn = !!sessionData.session;

      if (!isSignIn) {
        console.log('로그인 상태 아님');
        router.push('/login');
        return;
      }

      const userId = sessionData.session.user.id;

      const { data, error } = await supabase.from('posts').select('*').eq('user_id', userId);

      if (error) {
        throw new Error(error.message);
      }

      setPosts(data as PostData[]);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  return (
    <section className="w-[880px] px-10 py-6 border border-[#D5D6D8] rounded-2xl">
      <h2 className="text-xl font-semibold ml-5 mb-4">내가 작성한 글</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.id}>
              <Link href={`/posting-detail/${post?.id}`}>
                <div className="w-60 h-48 bg-gray-200 mb-4 relative">
                  <Image
                    className="object-cover"
                    src={post.image_url[0] || '/path/to/default-image.jpg'}
                    alt={`Post ${post.id}`}
                    layout="fill"
                  />
                </div>
                <h3 className="text-[#F5637C] font-semibold mb-2 truncate">{post.category}</h3>
                <p className="text-[#27282A] font-semibold mb-2 truncate">{post.title}</p>
                <p className="text-[#404145] mb-2 line-clamp-2">{post.content}</p>
                <time className="text-[#76797F]">{new Date(post.created_at).toLocaleDateString('ko-KR')}</time>
              </Link>
            </article>
          ))
        ) : (
          <div>
            <p className="text-[#404145]">아직 작성된 글이 존재하지 않아요.</p>
            <p className="text-[#404145]">커뮤니티에서 글을 작성해보세요!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PostsSection;
