import Defaultimg from '@/assets/image/defaultimg.png';
import React, { useState, useRef, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import ProfileImg from '@/components/Common/ProfileImg';
import SocialLogout from '@/components/LoginPage/SocialLogout';
import Link from 'next/link';

const ProfileDropdown = () => {
  const { user } = useUserStore((state) => state);
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

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={toggleDropdown} className={`border rounded-full overflow-hidden cursor-pointer`}>
        <ProfileImg
          src={user?.profile_url && user.profile_url.length > 0 ? user.profile_url : Defaultimg}
          width={40}
          height={40}
        />
      </div>
      {isOpen && (
        <div className="absolute -right-[50px] mt-2 w-[133px] bg-white border border-gray-300 rounded-lg shadow-lg">
          <Link href={'/my-page'} className="block px-2 py-2 text-sm letter-spacing color-dropdown">
            내 프로필
          </Link>
          <SocialLogout />
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
