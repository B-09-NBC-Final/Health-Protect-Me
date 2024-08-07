'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import Kebab from '@/assets/icons/icon_kebab.svg';
import { useEffect, useState } from 'react';

const KebabMenu = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const supabase = createClient();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        console.log('error', error);
      } else {
        setCurrentUser(data);
      }
    }
  };

  const handleUpdate = () => {
    router.push(`/posting-update/${id}`);
  };

  const handleDelete = async () => {
    const checkConfirm = confirm('정말 삭제하시겠습니까?');
    if (checkConfirm) {
      const { data: post, error: postError } = await supabase
        .from('posts')
        .select('user_id')
        .eq('id', id)
        .single();

      if (postError) {
        console.log('error', postError);
        return;
      }

      if (post.user_id !== currentUser.user_id) {
        alert('자신의 게시글만 삭제할 수 있습니다.');
        return;
      }

      const { error: deleteError } = await supabase.from('posts').delete().eq('id', id);

      if (deleteError) {
        console.log('error', deleteError);
        alert('삭제 중 오류가 발생했습니다.');
      } else {
        alert('삭제되었습니다.');
        router.push('/posting-main');
      }
    } else {
      alert('취소되었습니다.');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Image src={Kebab} alt="" width={20} height={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="!w-[105px] !min-w-full">
        <DropdownMenuItem className="justify-center px-0 py-2 text-gray900" onClick={handleUpdate}>
          <button type="button">글 수정하기</button>
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-center px-0 py-2 text-gray900 mt-1" onClick={handleDelete}>
          <button type="button">글 삭제하기</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default KebabMenu;