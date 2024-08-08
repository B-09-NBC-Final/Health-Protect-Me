import React from 'react';
import Link from 'next/link';
import SocialLogout from '@/components/LoginPage/SocialLogout';

const DropdownContent = () => {
  return (
    <div className="absolute -right-[50px] mt-2 w-[133px] bg-white border border-gray-300 rounded-lg shadow-lg">
      <Link href={'/my-page'} className="block px-2 py-2 text-sm letter-spacing color-dropdown">
        내 프로필
      </Link>
      <SocialLogout />
    </div>
  );
};

export default DropdownContent;
