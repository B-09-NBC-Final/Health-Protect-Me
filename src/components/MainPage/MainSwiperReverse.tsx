'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import Image from 'next/image';
import Card04 from '@/assets/image/img_main_card04.svg';
import Card05 from '@/assets/image/img_main_card05.svg';
import Card06 from '@/assets/image/img_main_card06.svg';
import Card07 from '@/assets/image/img_main_card07.svg';
import Card08 from '@/assets/image/img_main_card08.svg';

const MainSwiperReverse = () => {
  SwiperCore.use([Autoplay]);

  return (
    <Swiper
      className="text-white max-h-screen"
      spaceBetween={40}
      slidesPerView={3.5}
      direction={'vertical'}
      loop={true}
      speed={3000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: true
      }}
    >
      <SwiperSlide className="relative cursor-pointer !h-[260px]">
        <Image src={Card08} alt="" width={480} height={260} />
        <div className="text-area">
          <div>
            <strong className="text-lg font-semibold mb-2">좀 더 다양한 종류를 추천해주면 좋겠네요.</strong>
            <p>다양성이 더 생기면 좋겠어요.</p>
          </div>
          <div>
            <span>40대 남성</span>
            <p>건강 식사 목표</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer !h-[260px]">
        <Image src={Card07} alt="" width={480} height={260} />
        <div className="text-area">
          <div>
            <strong className="text-lg font-semibold mb-2">뭐 먹을지 고민할 필요가 없어요.</strong>
            <p>
              앱 덕분에 쉽게 재료를 선택하고, 건강한 식단을 계획할 수 있었어요. 매일 뭘 먹을지 고민할 필요가 없어졌어요.
            </p>
          </div>
          <div>
            <span>20대 여성</span>
            <p>체중 감량 목표</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer !h-[260px]">
        <Image src={Card06} alt="" width={480} height={260} />
        <div className="text-area">
          <div>
            <strong className="text-lg font-semibold mb-2">회사에서 저녁 뭐 먹을지 고민을 하지 않게 되었습니다.</strong>
            <p>
              매일 저녁 식사를 준비할 때 어떤 요리를 할지 고민이었는데, 앱에서 추천해주는 식단 덕분에 고민이 줄었어요.
              맛도 좋고 건강도 챙길 수 있어서 만족합니다.
            </p>
          </div>
          <div>
            <span>30대 여성</span>
            <p>건강 식사 목표</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer !h-[260px]">
        <Image src={Card05} alt="" width={480} height={260} />
        <div className="text-area">
          <div>
            <strong className="text-lg font-semibold mb-2">식단 추천 너무 좋아요.</strong>
            <p>
              사실 샐러드를 주로 먹는건 알고 있는데, 어떤 샐러드를 먹을지도 고민이었거든요. 그런 고민을 덜어줘서 좋아요.
            </p>
          </div>
          <div>
            <span>20대 여성</span>
            <p>체중 감량 목표</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer !h-[260px]">
        <Image src={Card04} alt="" width={480} height={260} />
        <div className="text-area">
          <div>
            <strong className="text-lg font-semibold mb-2">재료들로 만들어 먹었습니다.</strong>
            <p>추천해준 식단과 비슷하게 만들었는데, 재료랑 추천된 식단 비교 기능이 있는 것도 좋을 것 같아요.</p>
          </div>
          <div>
            <span>20대 남성</span>
            <p>건강 식사 목표</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default MainSwiperReverse;
