'use client';

import { createClient } from '@/supabase/client';
import { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type MyPost = Post & { users: { nickname: string } | null };

const PostingList = () => {
  const [posts, setPosts] = useState<MyPost[]>();
  const supabase = createClient();
  const dayjs = require('dayjs');
  const [selectedCategory, setSelectedCategory] = useState('전체 글 보기');
  const formatDate = (dateString: string) => dayjs(dateString).format('YY.MM.DD');

  const getPosts = async () => {
    const { data: posts, error } = await supabase.from('posts').select('*, users(nickname)');
    if (error) {
      console.log('getPost error', error);
      return;
    }
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const filteredPosts =
    selectedCategory === '전체 글 보기' ? posts : posts?.filter((post) => post.category === selectedCategory);

  return (
    <div>
      {filteredPosts?.length === 0 ? (
        <p className="text-gray600 mt-2">
          아직 작성된 글이 존재하지 않아요. <br />첫 번째 글을 작성하고 커뮤니티를 시작해보세요!
        </p>
      ) : (
        <ul>
          {filteredPosts?.map((item, index: number) => (
            <li
              key={index}
              className={`${
                index < filteredPosts.length - 1 ? 'border-b' : ''
              }   border-gray200 pb-4 mb-4 cursor-pointer`}
            >
              <Link href={`/posting-detail/${item?.id}`} className="flex">
                <Image
                  src={item.image_url[0]}
                  alt=""
                  width={128}
                  height={128}
                  className="!w-[128px] !h-[128px] rounded-lg"
                />
                <div className="flex flex-col justify-between ml-5 w-full">
                  <div>
                    <span className="text-sm font-semibold text-primary600 mb-2">{item.category}</span>
                    <p className="text-gray900 font-semibold">{item.title}</p>
                    <p className="line-clamp-2">{item.content}</p>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-xs text-gray600">{item.users?.nickname}</p>
                    <p className="text-xs text-gray600 pr-3">{formatDate(item.created_at)}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostingList;
