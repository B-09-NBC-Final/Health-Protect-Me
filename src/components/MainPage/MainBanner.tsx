'use client';

import { useRouter } from 'next/navigation';
import Button from '../common/Button';
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
    <div className="inner_wrap py-40 text-center">
      <h2 className="text-3xl font-bold mb-2">Health Protect Me</h2>
      <p className="text-2xl font-medium mb-10">당신의 건강을 함께 지켜드릴게요</p>
      <Button buttonName="맞춤 식단 제공받기" onClick={checkDiet}></Button>
    </div>
  );
};

export default MainBanner;
