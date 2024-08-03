'use client';

import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import Dropdown from './Dropdown';
import Image from 'next/image';
import logo from '@/assets/icons/Vector.svg';

const Header = () => {
  const { user } = useUserStore((state) => state);

  return (
    <header className="inner_wrap px-10">
      <div className="flex justify-between items-center bg-white py-4">
        <div className="flex items-center">
          <Link href={'/'}>
            <Image src={logo} alt="logo" width={100} height={28} />
          </Link>
        </div>
        <nav>
          {user ? (
            <ul className="flex items-center px-2 gap-10">
              <li>
                <Link href={'/info-detail'}>나만의 식단</Link>
              </li>
              <li>
                <Link href={'/posting-main'}>커뮤니티</Link>
              </li>
              <li>
                <Dropdown />
              </li>
            </ul>
          ) : (
            <ul className="flex items-center px-2 gap-10">
              <li>
                <Link href={'/posting-main'}>커뮤니티</Link>
              </li>
              <li>
                <Link href={'/login'}>로그인</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
