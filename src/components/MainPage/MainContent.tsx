'use client';

import Image from 'next/image';
import Thumbnail from '@/assets/image/img_thumbnail.svg';
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
    <section className="inner_wrap">
      <div className="flex justify-between items-end py-40">
        <div className="pb-20">
          <h2 className="text-5xl font-medium leading-tight mb-10 tracking-tight">
            간편하게, 나만을 위한 <br />
            맞춤형 건강 솔루션
          </h2>
          <Button
            buttonName="맞춤 식단 제공받기"
            onClick={checkDiet}
            hover="hover:shadow-main-btn-hover hover:bg-pramary600"
          ></Button>
        </div>
        <Image
          src={Thumbnail}
          alt="간편하게, 나만을 위한 맞춤형 건강 솔루션"
          width={790}
          height={606}
          placeholder="blur"
          blurDataURL="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88vR5PQAIlgMxdSRmwgAAAABJRU5ErkJggg=="
        />
      </div>
    </section>
  );
};

export default MainContent;
