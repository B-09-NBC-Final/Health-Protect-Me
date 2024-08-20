'use client';

import { useUserStore } from '@/store/userStore';
import { createClient } from '@/supabase/client';
import { Comments, Post } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type newComments = Comments & {
  users: {
    nickname: string;
  } | null;
};

const PostingComments = ({ post }: { post: Post }) => {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState<newComments[] | null>(null);
  const [newContent, setNewContent] = useState('');
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const { user } = useUserStore((state) => state);
  const supabase = createClient();
  const router = useRouter();
  const dayjs = require('dayjs');
  const formatDate = (date: string) => dayjs(date).format('YY.MM.DD');

  const getCommentList = async () => {
    if (!post || !post.id) {
      return;
    }
    const { data: commentsList, error } = await supabase
      .from('comments')
      .select('*, users(nickname)')
      .eq('post_id', post.id)
      .order('created_at', { ascending: false });

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

  const updateComment = async (id: number, newContent: string) => {
    const { error } = await supabase.from('comments').update({ content: newContent }).eq('id', id);

    if (error) {
      console.error('Error updating comment:', error);
      return;
    }

    setIsEditing(null);
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
      <p className="text-sm text-gray900 font-semibold pb-4 border-b border-solid border-gray200">
        댓글<span className="ml-1">{commentList?.length}</span>
      </p>
      {!user || user.is_survey_done ? (
        ''
      ) : (
        <form onSubmit={submitComment} className="flex pt-6">
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
      )}

      <ul>
        {commentList?.map((comment, idx) => (
          <li key={idx} className="mt-6 border-b border-solid border-gray200 pb-5">
            <div>
              <div className="flex justify-between items-center">
                <strong className="block font-normal text-sm text-gray900">{comment.users?.nickname}</strong>
                {user?.userId === comment.user_id && (
                  <div>
                    {isEditing === comment.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => updateComment(comment.id, newContent)}
                          className="text-sm text-primary600 border border-solid border-primary500 bg-white rounded px-2 py-[2px] ml-1 hover:bg-pramary100"
                        >
                          저장
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(null)}
                          className="text-sm text-gray900 border border-solid border-gray-400 bg-white rounded px-2 py-[2px] ml-1 hover:border-gray-400  hover:bg-gray-100"
                        >
                          취소
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(comment.id);
                            setNewContent(comment.content);
                          }}
                          className="text-sm border border-solid text-primary600 border-primary500 bg-white rounded px-2 py-[2px] hover:bg-pramary100"
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteComment(comment.id)}
                          className="text-sm border border-solid text-gray900  border-gray-400 rounded bg-white px-2 py-[2px] ml-1 hover:border-gray-400 hover:bg-gray-100"
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {isEditing === comment.id ? (
                <input
                  type="text"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="inline-block mt-1 bg-white border border-solid border-gray300 rounded-lg py-2 px-3 text-gray800 text-sm w-full"
                  maxLength={300}
                />
              ) : (
                <p className="inline-block mt-1 bg-[#FFF1F0] rounded-lg py-2 px-3 text-gray800 text-sm">
                  {comment.content}
                </p>
              )}
            </div>
            <p className="mt-2 text-xs text-gray600">{formatDate(comment.created_at)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostingComments;
