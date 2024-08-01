'use client';
import Button from '@/components/common/Button';
import PostingFilter from '@/components/Contents/PostingMain/PostingFilter';
import PostingList from '@/components/Contents/PostingMain/PostingList';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const PostingMainPage = () => {
  // const [user, setUser] = useState<User[]>();
  const [selectedCategory, setSelectedCategory] = useState('전체 글 보기');
  // const { user, setUser } = useUserStore((state) => state);
  const router = useRouter();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(4);

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const writePost = () => {
    router.push('/posting');
  };

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
          <PostingList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
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
