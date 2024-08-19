'use client';

import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import Dropdown from '@/utils/Dropdown';
import Image from 'next/image';
import logo from '@/assets/icons/Vector.svg';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client';

const Header = () => {
  const router = useRouter();
  const supabase = createClient();
  const { user } = useUserStore((state) => state);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const filterdInfo = async () => {
    const authToken = await supabase.auth.getSession();

    if (authToken.data.session === null) {
      router.push('/login');
      return;
    }

    const userId = authToken.data.session.user.id;

    const { data, error } = await supabase.from('users').select('is_survey_done').eq('user_id', userId).single();

    if (error) {
      console.error('Error fetching user data:', error);
      return;
    }

    if (data.is_survey_done) {
      router.push('/info-detail');
    } else {
      router.push('/info');
    }
  };

  return (
    <header className="fixed w-full bg-white z-10 h-[57px]">
      <div className="flex justify-between items-center px-10 py-4 h-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s xs:max-w-container-xs xs:px-5">
        <div className="flex items-center">
          <Link href={'/'}>
            <button>
              <Image src={logo} alt="logo" width={100} height={28} />
            </button>
          </Link>
        </div>
        <nav>
          {user ? (
            <>
              <ul className="xs:hidden flex items-center px-0 gap-10">
                <li>
                  <button onClick={filterdInfo} className="hover-effect">
                    나만의 식단
                  </button>
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
                <div className="hidden xs:flex">
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