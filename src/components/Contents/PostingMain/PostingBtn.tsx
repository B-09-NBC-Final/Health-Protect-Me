'use client';

import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

const PostingMainBtn = () => {
  const router = useRouter();

  const writePost = () => {
    router.push('/posting');
  };

  return (
    <Button
      buttonName="글 작성하기"
      onClick={writePost}
      bgColor="bg-white"
      boxShadow="none"
      textColor="text-primary600"
      marginX="mt-10"
      paddingY="py-2"
      border="border-primary500"
    ></Button>
  );
};

export default PostingMainBtn;
