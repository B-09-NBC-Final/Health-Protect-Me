import React from 'react';
import Link from 'next/link';
import SocialLogout from '@/components/LoginPage/SocialLogout';

type DropdownContentProps = {
  closeDropdown: () => void;
};

const DropdownContent: React.FC<DropdownContentProps> = ({ closeDropdown }) => {
  return (
    <div className="absolute -left-[62px] px-[10px] py-2 mt-2 w-[102px] bg-white border border-gray-300 rounded-lg shadow-lg ">
      <Link
        href={'/info-detail'}
        className="block md:hidden px-2 py-2 text-sm letter-spacing color-dropdown"
        onClick={closeDropdown}
      >
        나만의 식단
      </Link>
      <Link
        href={'/posting-main'}
        className="block md:hidden px-2 py-1 text-sm letter-spacing color-dropdown"
        onClick={closeDropdown}
      >
        커뮤니티
      </Link>
      <Link href={'/my-page'} className="block px-2 py-1 text-sm letter-spacing color-dropdown" onClick={closeDropdown}>
        나의 프로필
      </Link>
      <SocialLogout />
    </div>
  );
};

export default DropdownContent;
