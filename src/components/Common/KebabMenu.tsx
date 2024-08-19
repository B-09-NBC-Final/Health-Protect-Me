'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client';
import Image from 'next/image';
import Kebab from '@/assets/icons/icon_kebab.svg';
import { useEffect, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

const KebabMenu = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const supabase = createClient();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const clickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && event.target instanceof Node && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

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

  const handleUpdate = () => {
    router.push(`/posting-update/${id}`);
  };

  const handleDelete = async () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    const { data: post, error: postError } = await supabase.from('posts').select('user_id').eq('id', id).single();

    if (postError) {
      console.log('error', postError);
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

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  return (
    <>
      <div className="" ref={dropdownRef}>
        <Image src={Kebab} alt="" width={20} height={20} onClick={toggleDropdown} className="cursor-pointer" />
        {isOpen && (
          <div className="absolute top-[28px] right-2 border border-solid rounded-lg bg-white">
            <button type="button" className="block text-sm text-gray900 p-5 pb-3" onClick={handleUpdate}>
              글 수정하기
            </button>
            <button type="button" className="block text-sm text-backgroundError mt-1 p-5 pt-3" onClick={handleDelete}>
              글 삭제하기
            </button>
          </div>
        )}
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>게시글이 영구적으로 삭제됩니다.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-[#F5637C]">
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default KebabMenu;
