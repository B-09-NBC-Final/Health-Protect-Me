'use client';

import Image from 'next/image';
import Thumbnail from '@/assets/image/img_thumbnail.png';
import Button from '@/components/Common/Button';
import { createClient } from '@/supabase/client';
import { useRouter } from 'next/navigation';

const MainContent = () => {
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
    <section className="max-w-container-l mx-auto px-10 m:max-w-container-m s:max-w-container-s xs:max-w-container-xs xs:px-5">
      <div className="flex justify-between items-end py-40 s:flex-col-reverse s:items-center s:pt-24 s:pb-20">
        <div className="pb-20 s:mt-10 s:flex-col s:items-center s:pb-0">
          <h2 className="text-5xl font-medium leading-tight mb-10 tracking-tight s:text-center s:mb-6 xs:text-[28px]">
            간편하게, 나만을 위한 <br />
            맞춤형 건강 솔루션
          </h2>
          <Button
            buttonName="맞춤 식단 제공받기"
            onClick={checkDiet}
            hover="hover:shadow-main-btn-hover hover:bg-pramary600"
          ></Button>
        </div>
        <div className="ml-16 s:ml-0">
          <Image
            src={Thumbnail}
            alt="간편하게, 나만을 위한 맞춤형 건강 솔루션"
            width={790}
            height={606}
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default MainContent;
