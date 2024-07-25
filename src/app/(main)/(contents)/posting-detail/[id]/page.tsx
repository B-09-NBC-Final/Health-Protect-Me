import { useEffect, useState } from 'react';
import { Post, User } from '@/types';
import PostingDetailPost from '@/components/Contents/PostingDetail/PostingDetailPost';
import PostingDetailBtn from '@/components/Contents/PostingDetail/PostingDetailBtn';

const PostingDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-[1280px] p-[100px]">
        <PostingDetailPost params={params} />
        <PostingDetailBtn params={params} />
      </div>
    </main>
  );
};

export default PostingDetailPage;
