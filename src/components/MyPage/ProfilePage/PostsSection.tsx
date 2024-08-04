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
    <section className="w-[880px] px-10 py-6 border border-[#D5D6D8] rounded-2xl bg-white">
      <h2 className="text-2xl font-medium mb-4 text-gray900">내가 작성한 글</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.id}>
              <Link href={`/posting-detail/${post?.id}`}>
                <div className="w-60 h-48 mb-4 relative">
                  <Image
                    className="object-cover rounded-lg"
                    src={post.image_url[0] || '/path/to/default-image.jpg'}
                    alt={`Post ${post.id}`}
                    layout="fill"
                  />
                </div>
                <h3 className="text-primary600 text-sm font-semibold mb-2 truncate">{post.category}</h3>
                <p className="text-gray900 font-semibold mb-1 truncate">{post.title}</p>
                <p className="text-gray800 text-sm mb-2 line-clamp-2 h-10">{post.content}</p>
                <time className="text-gray600 text-sm">{new Date(post.created_at).toLocaleDateString('ko-KR')}</time>
              </Link>
            </article>
          ))
        ) : (
          <div>
            <p className="text-[#404145]">아직 작성된 글이 존재하지 않아요.</p>
            <p className="text-[#404145]">첫번째 글을 작성하고 커뮤니티를 시작해보세요!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PostsSection;
