import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Defaultimg from '@/assets/image/defaultimg.png';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client';
import { useUserStore } from '@/store/userStore';
import ProfileImg from '@/components/common/ProfileImg';
const Dropdown = () => {
  const { user, setUser } = useUserStore((state) => state);
  const router = useRouter();
  const supabase = createClient();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      router.push('/');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileImg
          src={user?.profile_url && user.profile_url.length > 0 ? user.profile_url : Defaultimg}
          width={40}
          height={40}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={'/my-page'}>내 프로필</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button onClick={signOut} className="flex items-center">
            로그아웃
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
