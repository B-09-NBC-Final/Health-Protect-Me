'use client';

import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import Dropdown from '@/utils/Dropdown';
import Image from 'next/image';
import logo from '@/assets/icons/Vector.svg';
import { useMediaQuery } from 'react-responsive';

const Header = () => {
  const { user } = useUserStore((state) => state);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <header className="fixed w-full bg-white z-10 h-[57px]">
      <div className="flex justify-between items-center px-10 py-4 h-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s xs:max-w-container-xs s:px-5">
        <div className="flex items-center">
          <Link href={'/'}>
            <Image src={logo} alt="logo" width={100} height={28} />
          </Link>
        </div>
        <nav>
          {user ? (
            <>
              <ul className="hidden md:flex items-center px-0 gap-10 ">
                <li>
                  <Link href={'/info-detail'} className="hover-effect">
                    나만의 식단
                  </Link>
                </li>
                <li>
                  <Link href={'/posting-main'} className="hover-effect">
                    커뮤니티
                  </Link>
                </li>
                <div className="w-px h-5 bg-gray-300"></div>
                {!isMobile && (
                  <li className="flex items-center w-10 h-10">
                    <Dropdown />
                  </li>
                )}
              </ul>
              {isMobile && (
                <div className="md:hidden block">
                  <Dropdown />
                </div>
              )}
            </>
          ) : (
            <ul className="flex items-center px-2 gap-10">
              <li>
                <Link href={'/posting-main'} className="hover-effect">
                  커뮤니티
                </Link>
              </li>
              <li>
                <Link href={'/login'} className="hover-effect">
                  로그인
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
