'use client';

import Image from 'next/image';
import Thumbnail from '@/assets/image/img_thumbnail.svg';
import Button from '@/components/common/Button';
import { createClient } from '@/supabase/client';
import { useRouter } from 'next/navigation';

const MainContent = () => {
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
        <Image src={Thumbnail} alt="간편하게, 나만을 위한 맞춤형 건강 솔루션" width={790} height={606} />
      </div>
    </section>
  );
};

export default MainContent;
