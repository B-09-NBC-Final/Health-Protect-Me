'use client';

import React, { useState, useContext } from 'react';
import Defaultimg from '@/assets/image/defaultimg.png';
import Image from 'next/image';
import Link from 'next/link';
import { useUserStore } from '@/store/userStore';

const Header = () => {
  const { user, setUser } = useUserStore((state) => state);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <Link href={'/'}>
        <div className="text-lg font-bold">Logo</div>
      </Link>
      <nav>
        {user ? (
          <ul className="flex space-x-4">
            <Link href={'/info-detail'}>
              <li>나만의 식단</li>
            </Link>
            <Link href={'/posting-main'}>
              <li>커뮤니티</li>
            </Link>
            <li>
              <Image src={Defaultimg} alt="profile img" width={50} height={50} className="w-6 h-6 rounded-full mr-2" />
              <Link href={'/'} className="flex items-center">
                로그아웃
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex space-x-4">
            <Link href={'/posting-main'}>
              <li>커뮤니티</li>
            </Link>
            <li>
              <Link href={'/login'}>
                <button onClick={() => setIsLoggedIn(true)}>로그인</button>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
