'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import Image from 'next/image';
import Card01 from '@/assets/image/img_main_card01.svg';
import Card02 from '@/assets/image/img_main_card02.svg';
import Card03 from '@/assets/image/img_main_card03.svg';
import Card04 from '@/assets/image/img_main_card04.svg';
import Card05 from '@/assets/image/img_main_card05.svg';

const MainSwiper = () => {
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
        disableOnInteraction: false
      }}
    >
      <SwiperSlide className="relative cursor-pointer !h-[260px]">
        <Image src={Card01} alt="" width={480} height={260} />
        <div className="text-area">
          <div>
            <strong className="text-lg font-semibold mb-2">
              추천 식단에 따라 스테이크를 포함한 저녁을 먹어봤습니다.
            </strong>
            <p>
              구운 채소랑 현미밥과 같이 먹으니 좀 더 건강한 느낌이었고 균형 잡힌 식단으로 좋았어요. 스테이크도 너무
              부드럽고 맛있었네요. 체중 관리하면서 단백질 보충해야 하시는 분 추천드려요.
            </p>
          </div>
          <div>
            <span>20대 여성</span>
            <p>체중 감량 목표</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer !h-[260px]">
        <Image src={Card02} alt="" width={480} height={260} />
        <div className="text-area">
          <div>
            <strong className="text-lg font-semibold mb-2">식단 고민할 필요가 없어져서 편해요</strong>
            <p>
              매일 퇴근하면서 저녁 뭐 먹지 고민하다가 배민키고 시켜먹는게 일상이었는데, 식단대로 먹기만 하면 되니 돈도
              절약되고 편합니다.
            </p>
          </div>
          <div>
            <span>20대 여성</span>
            <p>건강 식사 목표</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer !h-[260px]">
        <Image src={Card03} alt="" width={480} height={260} />
        <div className="text-area">
          <div>
            <strong className="text-lg font-semibold mb-2">간식으로 팬 케이크 만들었습니다.</strong>
            <p>간식까지 추천해줘서 좋아요!! 식사 보충 겸 간식까지!!</p>
          </div>
          <div>
            <span>30대 여성</span>
            <p>체중 증량 목표</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer !h-[260px]">
        <Image src={Card04} alt="" width={480} height={260} />
        <div className="text-area">
          <div>
            <strong className="text-lg font-semibold mb-2">다이어트 식단으로 효과적</strong>
            <p>체중 감량으로 선택하니 적당히 포만감도 있는데 다이어트에 효과적이에요..!</p>
          </div>
          <div>
            <span>20대 남성</span>
            <p>체중 감량 목표</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer !h-[260px]">
        <Image src={Card05} alt="" width={480} height={260} />
        <div className="text-area">
          <div>
            <strong className="text-lg font-semibold mb-2">건강한 식사하고 싶어서 이용했는데</strong>
            <p>
              건강 식사 목표로 선택하고 식단대로 먹으니 몸이 건강해진 기분입니다. 추천 식단과 괜찮은 상품을 연결해주면
              더 좋을 것 같아요.
            </p>
          </div>
          <div>
            <span>30대 남성</span>
            <p>건강 식사 목표</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default MainSwiper;
