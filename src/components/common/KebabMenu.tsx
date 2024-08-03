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
import Link from 'next/link';
import Kebab from '@/assets/icons/icon_kebab.svg';

const KebabMenu = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const supabase = createClient();
  const router = useRouter();

  const handleUpdate = () => {
    router.push(`/posting-update/${id}`);
  };

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
