'use client';

import { useRouter } from 'next/navigation';
import Button from '../Common/Button';
import { createClient } from '@/supabase/client';

const MainBanner = () => {
  const router = useRouter();
  const checkDiet = async () => {
    const supabase = createClient();
    const authToken = await supabase.auth.getSession();
    if (!authToken.data.session) {
      router.push('/login');
    } else {
      router.push('/info-detail');
    }
  };
  return (
    <div className="inner_wrap !py-40 text-center">
      <h2 className="text-[32px] font-bold mb-2 text-gray900 login_title">Health Protect Me</h2>
      <p className="text-2xl font-medium mb-10 text-gray800">당신의 건강을 함께 지켜드릴게요</p>
      <Button
        buttonName="맞춤 식단 제공받기"
        onClick={checkDiet}
        hover="hover:shadow-main-btn-hover hover:bg-pramary600"
      ></Button>
    </div>
  );
};

export default MainBanner;
