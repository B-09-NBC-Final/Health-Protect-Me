'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client';

const PostingDetailBtn = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const supabase = createClient();
  const router = useRouter();

  const handleDelete = async () => {
    const checkConfirm = confirm('정말 삭제하시겠습니까?');
    if (checkConfirm) {
      alert('삭제되었습니다.');
      await supabase.from('posts').delete().eq('id', id);
      router.push('/posting-main');
    } else {
      alert('취소되었습니다.');
    }
  };
  return (
    <div className="mt-5 text-right">
      <button type="button" className="p-3 bg-gray-200">
        수정하기
      </button>
      <button onClick={handleDelete} type="button" className="p-3 bg-gray-200 ml-5">
        삭제하기
      </button>
    </div>
  );
};

export default PostingDetailBtn;
