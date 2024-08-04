import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Defaultimg from '@/assets/image/defaultimg.png';

import React from 'react';
import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import ProfileImg from '@/components/common/ProfileImg';
import SocialLogout from '@/components/LoginPage/SocialLogout';
const Dropdown = () => {
  const { user } = useUserStore((state) => state);

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
        <DropdownMenuItem asChild>
          <Link href={'/my-page'} passHref>
            내 프로필
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SocialLogout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
