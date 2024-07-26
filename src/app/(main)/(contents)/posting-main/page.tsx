'use client';
import { createClient } from '@/supabase/client';
import { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const PostingMainPage = () => {
  const [posts, setPosts] = useState<Post | null>(null);
  const supabase = createClient();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(4);

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getPosts = async () => {
    const { data: post, error } = await supabase.from('posts').select('*');
    setPosts(post);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[1280px] p-[100px]">
        <ul>
          {posts?.map((item, index: number) => (
            <li key={index} className="border-b pb-4 mb-4 cursor-pointer">
              <Link href={`/posting-detail/${item?.id}`} className="flex">
                <Image src={item.image_url[0]} alt="" width={144} height={144} className="!w-[144px] !h-[144px]" />
                <div className="flex flex-col justify-between ml-5">
                  <div>
                    <h2 className="font-bold mb-2">{item.title}</h2>
                    <p className="mb-2">{item.content}</p>
                  </div>
                  {/* <div className="flex justify-between">
                    <p>{item.nickname}</p>
                    <p>{item.date}</p>
                  </div> */}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-5 text-right">
          <button type="button" className="p-3 bg-gray-200">
            <Link href={`/posting`}>글 작성</Link>
          </button>
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
