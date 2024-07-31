'use client';

import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import { createClient } from '@/supabase/client';
import { useEffect } from 'react';
import Dropdown from './Dropdown';

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
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <Link href={'/'}>
        <div className="text-lg font-bold">Logo</div>
      </Link>
      <nav>
        {user ? (
          <ul className="flex space-x-4">
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
          <ul className="flex space-x-4">
            <li>
              <Link href={'/posting-main'}>커뮤니티</Link>
            </li>
            <li>
              <Link href={'/login'}>로그인</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
