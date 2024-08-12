'use client';

import { useUserStore } from '@/store/userStore';
import { createClient } from '@/supabase/client';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

const SignOutButton = () => {
  const { clearUser } = useUserStore((state) => state);
  const router = useRouter();
  const supabase = createClient();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    clearUser();
    router.push('/');
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="block w-full text-left px-2 py-2 text-sm letter-spacing color-dropdown" onClick={signOut}>
          로그아웃
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>로그아웃이 완료되었습니다.</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogCancel>아니요</AlertDialogCancel> */}
          <AlertDialogAction onClick={() => signOut()}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignOutButton;
