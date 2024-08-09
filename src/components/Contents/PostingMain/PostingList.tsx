'use client';

import { createClient } from '@/supabase/client';
import { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PostingMainBtn from './PostingBtn';
import { useQuery } from '@tanstack/react-query';
import Pagination from '@/components/Common/Pagination';

type MyPost = Post & { users: { nickname: string } | null };

const ITEMS_PER_PAGE = 4;

const PostingList = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체 글 보기');
  const [page, setPage] = useState(2);
  const categories = ['전체 글 보기', '잡담', '질문', '정보'];
  const supabase = createClient();
  const dayjs = require('dayjs');
  const formatDate = (dateString: string) => dayjs(dateString).format('YY.MM.DD');

  const getPostsCount = async () => {
    const { data: pagination, count } = await supabase
      .from('posts')
      .select('*, users(nickname)', { count: 'exact' })
      .range(ITEMS_PER_PAGE * (page - 1), ITEMS_PER_PAGE * (page - 1) + ITEMS_PER_PAGE - 1);
    return { pagination, count };
  };

  const {
    data: totalCount,
    isPending: countLoading,
    isError: countError
  } = useQuery({
    queryKey: ['postsCount'],
    queryFn: getPostsCount
  });

  if (countLoading) {
    return <div>로딩중입니다...</div>;
  }

  if (countError) {
    return <div>데이터 조회 중 오류가 발생했습니다.</div>;
  }

  const filteredPosts =
    selectedCategory === '전체 글 보기'
      ? totalCount.pagination
      : totalCount.pagination?.filter((post) => post.category === selectedCategory);

  const totalPages = Math.ceil((totalCount.count as number) / ITEMS_PER_PAGE);

  console.log(totalPages);
  console.log(totalCount.pagination);
  return (
    <>
      <div className="w-[248px]">
        <nav className="flex flex-col border border-solid rounded-xl border-gray300 p-2 bg-white ">
          {categories.map((category, idx) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`h-[40px] rounded-xl text-sm text-left py-3 px-4 flex items-center ${
                category === selectedCategory
                  ? 'bg-pramary500 text-white font-semibold'
                  : 'bg-white text-black border-gray-300'
              } ${idx < categories.length - 1 ? 'mb-2' : ''}`}
            >
              {category}
            </button>
          ))}
        </nav>
        <PostingMainBtn />
      </div>
      <div className="border border-solid rounded-xl border-gray300 w-[1032px] ml-20 px-10 py-6 bg-white">
        <h2 className="mb-4 text-2xl text-gray900 font-medium">건강한 식단 이야기</h2>
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
                      <p className="line-clamp-2 text-gray800 text-sm">{item.content}</p>
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
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </>
  );
};

export default PostingList;
