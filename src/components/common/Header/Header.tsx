'use client';

import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import { createClient } from '@/supabase/client';
import { useEffect } from 'react';
import Dropdown from './Dropdown';
import Image from 'next/image';
import logo from '@/assets/icons/Vector.svg';

const Header = () => {
  const { user, setUser } = useUserStore((state) => state);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else if (data) {
        setUser({
          userId: data.user?.id || '',
          email: data.user?.email,
          profile_url: data.user?.user_metadata?.profile_url || ''
        });
      }
    };
    getUser();
  }, []);

  return (
    <header className="bg-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href={'/'}>
            <Image src={logo} alt="logo" width={100} height={28} />
          </Link>
        </div>
        <nav>
          {user ? (
            <ul className="flex space-x-14 items-center">
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
            <ul className="flex space-x-14 items-center">
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
