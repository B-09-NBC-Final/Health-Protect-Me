'use client';

import { createClient } from '@/supabase/client';
import { Post, User } from '@/types';
import { useEffect, useState } from 'react';

const PostingComments = ({ post, user }: { post: Post; user: User }) => {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState('');
  const supabase = createClient();

  const getComment = async () => {
    if (!post || post.id) {
      return;
    }
    const { data: comments, error } = await supabase.from('comments').select('').eq('post_id', post.id);
    console.log(comments);
  };

  useEffect(() => {
    if (post && post.id) {
      getComment();
    }
  }, [post]);

  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data: commentData, error } = await supabase.from('comments').insert({
      user_id: user.user_id,
      content: comment,
      post_id: post.id
    });

    if (error) {
      console.log('comment error', error);
    }

    setComment('');
  };

  return (
    <div className="mt-10 pb-16">
      <p className="text-sm text-gray900 font-semibold pb-4">
        댓글<span className="ml-1">2</span>
      </p>
      <form onSubmit={submitComment} className="flex border-t border-solid border-gray200 py-6">
        <input
          className="w-full border border-solid border-gray300 py-2 px-3 rounded-lg text-sm"
          type="text"
          placeholder="댓글을 작성해 보세요. 최대 300자 까지 입력 가능해요."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button
          className="w-20 text-sm text-gray900 py-2 border border-solid border-gray400 bg-white rounded ml-2"
          type="submit"
        >
          등록
        </button>
      </form>
      <div>
        <strong className="font-normal text-sm text-gray900">건강전문가</strong>
        <span className="block text-xs text-backgroundInfo">건강 식사</span>
        <p className="inline-block mt-2 bg-[#FFF1F0] rounded-lg py-2 px-3 text-gray800 text-sm">
          피자가 맛있어 보이네요. 어디 브랜드인가요?
        </p>
        <p className="mt-2 text-gray600 text-sm">24.08.06</p>
      </div>
    </div>
  );
};

export default PostingComments;
