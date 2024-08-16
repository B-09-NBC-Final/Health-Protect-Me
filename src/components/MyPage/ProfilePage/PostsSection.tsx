'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import myPageDefaultImg from '@/assets/image/img_myDefaultImg.png';

type PostData = {
  id: string;
  title: string;
  content: string;
  user_id: string;
  image_url: string[];
  created_at: string;
  category: string;
  updated_at: Date;
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
        router.push('/login');
        return;
      }

      const userId = sessionData.session.user.id;

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

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
    <div className="w-[880px] s:w-full s:mt-6 px-10 s:px-4 py-6 border border-[#D5D6D8] rounded-2xl bg-white">
      <h2 className="text-2xl font-medium mb-4 text-gray900 s:font-[600]">내가 작성한 글</h2>
      <div className="h-[600px] s:h-full overflow-y-auto custom-scrollbar">
        <div className="flex flex-wrap gap-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.id} className="mb-6 w-[240px] s:w-full">
                <Link href={`/posting-detail/${post?.id}`}>
                  <div className="w-full h-48 mb-4 relative">
                    <Image
                      className="object-cover s:border rounded-lg s:mb-4"
                      src={post.image_url[0] || myPageDefaultImg}
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
            <div className="col-span-3 s:col-span-3">
              <p className="text-[#404145]">아직 작성된 글이 존재하지 않아요.</p>
              <p className="text-[#404145]">첫번째 글을 작성하고 커뮤니티를 시작해보세요!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsSection;
