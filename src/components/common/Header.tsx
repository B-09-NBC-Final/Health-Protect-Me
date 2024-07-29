'use client';

import Defaultimg from '@/assets/image/defaultimg.png';
import Image from 'next/image';
import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client';

const Header = () => {
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
  console.log(user);

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
              <Link href={'/my-page'}>내 프로필</Link>
            </li>
            <li>
              <Image src={Defaultimg} alt="profile img" width={50} height={50} className="w-6 h-6 rounded-full mr-2" />
            </li>
            <li>
              <button onClick={signOut} className="flex items-center">
                로그아웃
              </button>
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
