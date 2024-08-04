import PostingFilter from '@/components/Contents/PostingMain/PostingFilter';
import PostingList from '@/components/Contents/PostingMain/PostingList';
import PostingMainBtn from '@/components/Contents/PostingMain/PostingMainBtn';
import { useState } from 'react';

const PostingMainPage = () => {
  return (
    <div className="flex justify-between">
      <div className="w-[248px]">
        <PostingFilter />
        <PostingMainBtn />
      </div>
      <div className="border border-solid rounded-xl border-gray300 w-[1032px] ml-20 px-10 pt-6 bg-white">
        <h2 className="mb-4 text-2xl text-gray900 font-medium">건강한 식단 이야기</h2>
        <PostingList />
      </div>
    </div>
  );
};

export default PostingMainPage;
