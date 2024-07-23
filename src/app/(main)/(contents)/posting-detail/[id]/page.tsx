import React from 'react';
import Image from 'next/image';
import PostingDetailPost from '@/components/Contents/PostingDetail/PostingDetailPost';

const PostingDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    // 팀원들이랑 상의해서 main 공통으로 빼기
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-[1280px] p-[100px]">
        <PostingDetailPost params={params} />
        <div className="flex border-y-2 border-solid border-coral py-5">
          <Image src="" alt="" width={50} height={50} className="rounded-full" />
          <div className="flex flex-col ml-5">
            <strong>닉네임</strong>
            <span>24.7.18</span>
          </div>
        </div>
        <div className="mt-5 text-right">
          <button type="button" className="p-3 bg-gray-200">
            수정하기
          </button>
          <button type="button" className="p-3 bg-gray-200 ml-5">
            삭제하기
          </button>
        </div>
      </div>
    </main>
  );
};

export default PostingDetailPage;
