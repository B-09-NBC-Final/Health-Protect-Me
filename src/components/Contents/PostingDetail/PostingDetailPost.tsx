'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createClient } from '@/supabase/client';
import { Post, User } from '@/types';
import Defaultimg from '@/assets/image/defaultimg.png';
import KebabMenu from '@/components/Common/KebabMenu';
import Skeleton from '@/components/Common/Skeleton';
import PostingComments from './PostingComments';

const PostingDetailPost = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const supabase = createClient();
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userPurpose, setUserPurpose] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const postDate = new Date(post?.created_at as string);
  const postYear = String(postDate.getFullYear()).slice(-2);
  const postMonth = String(postDate.getMonth() + 1).padStart(2, '0');
  const postDay = String(postDate.getDate()).padStart(2, '0');
  const dateOnly = `${postYear}.${postMonth}.${postDay}`;
  const defaultImageUrl = Defaultimg;

  const getPost = async () => {
    const { data: getPost, error } = await supabase.from('posts').select('*').eq('id', id).single();

    if (error) {
      console.log('error', error);
      return;
    }
    setPost(getPost);
  };

  const getUser = async (userId: string) => {
    const { data: getUser, error } = await supabase.from('users').select('*').eq('user_id', userId).single();

    if (error) {
      console.log('error', error);
    } else {
      setUser(getUser);
    }
  };

  const getPurpose = async () => {
    if (user?.user_id) {
      const { data, error: infoError } = await supabase
        .from('information')
        .select('purpose')
        .eq('user_id', user.user_id as string)
        .single();

      if (infoError) {
        console.error('Error fetching data:', infoError);
      }
      const purpose = data?.purpose;
      setUserPurpose(purpose as string);
    }
  };

  useEffect(() => {
    getPost();
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase.from('users').select('*').eq('user_id', user.id).single();

      if (error) {
        console.log('error', error);
      } else {
        setCurrentUser(data);
      }
    }
  };

  useEffect(() => {
    if (post?.user_id) {
      getUser(post.user_id);
    }
  }, [post]);

  useEffect(() => {
    getPurpose();
  }, [user]);

  return (
    <>
      <div className="w-[800px] mx-auto s:w-full xs:pb-6">
        {post ? (
          <span className="text-primary600 border-primary500 border border-solid py-[3px] px-[7.5px] mb-3 rounded bg-white text-sm">
            {post?.category}
          </span>
        ) : (
          <Skeleton className="!w-[50px] !h-[24px] rounded-xl" />
        )}

        <div className="flex justify-between items-center mt-1 relative">
          {post ? (
            <p className="text-gray900 font-semibold">{post?.title}</p>
          ) : (
            <Skeleton className="!w-[100px] !h-[24px] rounded-xl mt-2" />
          )}
          {currentUser && post && currentUser.user_id === post.user_id && (
            <i>
              <KebabMenu params={params} />
            </i>
          )}
        </div>
        {post ? (
          <p className="text-gray600 text-sm pb-4 border-b border-gray200 border-solid">{dateOnly}</p>
        ) : (
          <Skeleton className="!w-[80px] !h-[20px] rounded-xl mt-2" />
        )}

        {post?.image_url[0] ? (
          <Image
            src={post?.image_url[0] as string}
            alt=""
            width={420}
            height={280}
            className="object-cover mt-6 rounded !w-[420px] !h-[280px]"
          />
        ) : null}
        {post?.image_url[1] ? (
          <Image
            src={post?.image_url[1] as string}
            alt=""
            width={420}
            height={280}
            className="object-cover mt-6 rounded !w-[420px] !h-[280px]"
          />
        ) : null}

        {post?.image_url[2] ? (
          <Image
            src={post?.image_url[2] as string}
            alt=""
            width={420}
            height={280}
            className="object-cover mt-6 rounded !w-[420px] !h-[280px]"
          />
        ) : null}

        {post ? (
          <p className="text-gray800 mt-6 break-all">{post?.content}</p>
        ) : (
          <Skeleton className="!w-[350px] !h-[24px] rounded-xl mt-6" />
        )}

        <div className="inline-flex border border-gray100 border-solid rounded-2xl pl-3 py-6 pr-6 mt-10 bg-gray-50">
          <Image
            src={user?.profile_url ? (user?.profile_url as string) : defaultImageUrl}
            alt=""
            width={40}
            height={40}
            className="rounded-xl w-10 h-10 object-cover"
          />
          <div className="flex flex-col ml-3 text-gray900">
            {post ? (
              <p className="text-sm mb-1">{user?.nickname}</p>
            ) : (
              <Skeleton className="!w-[80px] !h-[20px] rounded-xl mb-1" />
            )}
            {post ? (
              <span className="text-xs text-backgroundInfo">{userPurpose}</span>
            ) : (
              <Skeleton className="!w-[50px] !h-[20px] rounded-xl" />
            )}
          </div>
        </div>
        <PostingComments />
      </div>
    </>
  );
};

export default PostingDetailPost;
