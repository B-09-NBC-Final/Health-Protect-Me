'use client';

import { useUserStore } from '@/store/userStore';
import { createClient } from '@/supabase/client';
import { Comments, Post } from '@/types';
import { useEffect, useState } from 'react';

type newComments = Comments & {
  users: {
    nickname: string;
  } | null;
};

const PostingComments = ({ post }: { post: Post }) => {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState<newComments[] | null>(null);
  const { user } = useUserStore((state) => state);
  const supabase = createClient();
  const dayjs = require('dayjs');
  const formatDate = (date: string) => dayjs(date).format('YY.MM.DD');

  const getCommentList = async () => {
    if (!post || !post.id) {
      return;
    }
    const { data: commentsList, error } = await supabase
      .from('comments')
      .select('*, users(nickname)')
      .eq('post_id', post.id);

    if (error) {
      console.error('Error fetching comments:', error);
      return;
    }

    setCommentList(commentsList);
  };

  useEffect(() => {
    if (post && post.id) {
      getCommentList();
    }
  }, [post, commentList]);

  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data: commentData, error } = await supabase.from('comments').insert({
      user_id: user?.userId as string,
      content: comment,
      post_id: post.id
    });

    if (error) {
      console.log('comment error', error);
    }

    setComment('');
  };

  const deleteComment = async (id: number) => {
    const { data, error } = await supabase.from('comments').delete().eq('id', id);

    if (error) {
      console.log('error', error);
      return;
    }
  };

  return (
    <div className="mt-10 pb-16">
      <p className="text-sm text-gray900 font-semibold pb-4">
        댓글<span className="ml-1">{commentList?.length}</span>
      </p>
      <form onSubmit={submitComment} className="flex border-t border-solid border-gray200 pt-6">
        <input
          className="w-full border border-solid border-gray300 py-2 px-3 rounded-lg text-sm"
          type="text"
          placeholder="댓글을 작성해 보세요."
          maxLength={300}
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
      <ul>
        {commentList?.map((comment, idx) => (
          <li key={idx} className="mt-6">
            <div className="flex justify-between items-center">
              <strong className="block font-normal text-sm text-gray900">{comment.users?.nickname}</strong>
              {user?.userId === comment.user_id ? (
                <div>
                  <button
                    type="button"
                    className="text-sm text-gray900 border border-solid border-gray200 rounded px-2 py-[2px]"
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    className="text-sm text-gray900 border border-solid border-gray200 rounded px-2 py-[2px] ml-1"
                    onClick={() => deleteComment(comment.id)}
                  >
                    삭제
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
            <p className="inline-block mt-2 bg-[#FFF1F0] rounded-lg py-2 px-3 text-gray800 text-sm">
              {comment.content}
            </p>
            <p className="mt-2 text-gray600 text-sm">{formatDate(comment.created_at)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostingComments;
