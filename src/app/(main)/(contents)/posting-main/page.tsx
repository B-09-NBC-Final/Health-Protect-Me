'use client';
import Button from '@/components/common/Button';
import PostingFilter from '@/components/PostingPage/PostingMain/PostingFilter';
import { useUserStore } from '@/store/userStore';
import { createClient } from '@/supabase/client';
import { Post, User } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const PostingMainPage = () => {
  const [posts, setPosts] = useState<Post[]>();
  // const [user, setUser] = useState<User[]>();
  const [selectedCategory, setSelectedCategory] = useState('전체 글 보기');
  // const { user, setUser } = useUserStore((state) => state);
  const supabase = createClient();
  const router = useRouter();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(4);

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getPosts = async () => {
    const { data: posts, error } = await supabase.from('posts').select('*');
    if (error) {
      console.log('getPost error', error);
      return;
    }
    setPosts(posts);
  };

  const writePost = () => {
    router.push('/posting');
  };

  useEffect(() => {
    getPosts();
  }, []);

  const filteredPosts =
    selectedCategory === '전체 글 보기' ? posts : posts?.filter((post) => post.category === selectedCategory);

  return (
    <main className="min-h-screen">
      <div className="flex justify-between mx-auto max-w-[1440px] p-[40px]">
        <div className="w-[248px]">
          <PostingFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <Button
            buttonName="글 작성하기"
            onClick={writePost}
            bgColor="#FFFFFF"
            boxShadow="none"
            textColor="text-primary600"
            marginX="mt-10"
            paddingY="py-2"
            border="border-pramary500"
          ></Button>
        </div>
        <div className="border border-solid rounded-xl border-gray300 w-[1032px] ml-20 px-10 py-6">
          <h2 className="mb-4 text-2xl text-gray900 font-medium">건강한 식단 이야기</h2>
          <ul>
            {filteredPosts?.map((item, index: number) => (
              <li
                key={index}
                className={`${
                  index < filteredPosts.length - 1 ? 'border-b' : ''
                }   border-gray200 pb-4 mb-4 cursor-pointer`}
              >
                {' '}
                <Link href={`/posting-detail/${item?.id}`} className="flex">
                  <Image
                    src={item.image_url[0]}
                    alt=""
                    width={128}
                    height={128}
                    className="!w-[128px] !h-[128px] rounded-lg"
                  />
                  <div className="flex flex-col justify-between ml-5">
                    <div>
                      <span className="text-sm font-semibold text-primary600 mb-2">{item.category}</span>
                      <p className="text-gray900 font-semibold">{item.title}</p>
                      <p className="line-clamp-2">{item.content}</p>
                    </div>
                    {/* <div className="flex justify-between">
                    <p>{item?.user_id === user?.userId ? user?.n}</p>
                    <p>{item.date}</p>
                  </div> */}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* <div className="flex justify-center mt-4">
          <button className={`px-3 py-1`} onClick={() => paginate(currentPage - 1)}>
            &lt;
          </button>
          {Array.from({ length: Math.ceil(lunchItems.length / postsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-3 py-1 ${currentPage === pageNumber ? 'text-black font-bold' : ''}`}
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button className={`px-3 py-1`} onClick={() => paginate(currentPage + 1)}>
            &gt;
          </button>
        </div> */}
      </div>
    </main>
  );
};

export default PostingMainPage;
