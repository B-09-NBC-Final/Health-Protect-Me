'use client';

import { useRouter } from 'next/navigation';
import Button from '../Common/Button';
import { createClient } from '@/supabase/client';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['800'],
  display: 'swap'
});

const MainBanner = () => {
  const router = useRouter();

  const checkDiet = async () => {
    const supabase = createClient();
    const authToken = await supabase.auth.getSession();

    if (authToken.data.session === null) {
      router.push('/login');
      return;
    }

    const userId = authToken.data.session!.user.id;

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
    <div className="max-w-container-l !py-40 text-center mx-auto flex flex-col items-center m:max-w-container-m s:max-w-container-s xs:max-w-container-xs xs:px-5 s:!py-20">
      <h2 className={`${montserrat.className} text-[32px] font-bold mb-2 text-gray900 s:text-2xl`}>
        Health Protect Me
      </h2>
      <p className="text-2xl font-medium mb-10 text-gray800 s:text-lg s:mb-6">당신의 건강을 함께 지켜드릴게요</p>
      <Button
        buttonName="맞춤 식단 제공받기"
        onClick={checkDiet}
        hover="hover:shadow-main-btn-hover hover:bg-pramary600"
      ></Button>
    </div>
  );
};

export default MainBanner;
