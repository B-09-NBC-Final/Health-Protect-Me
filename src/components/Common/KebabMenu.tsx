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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const KebabMenu = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const supabase = createClient();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
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
      router.push('/posting-main');
    }
  };

  return (
    <>
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

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
               게시글이 영구적으로 삭제됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default KebabMenu;