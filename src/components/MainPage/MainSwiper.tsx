'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import Image from 'next/image';
import Card01 from '@/assets/image/img_main_card01.svg';
import Card02 from '@/assets/image/img_main_card02.svg';

const MainSwiper = ({ reverseDirection }: { reverseDirection: boolean }) => {
  SwiperCore.use([Autoplay]);

  return (
    <Swiper
      className="text-white max-h-screen"
      spaceBetween={58}
      slidesPerView={'auto'}
      direction={'vertical'}
      loop={true}
      speed={3000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: reverseDirection
      }}
    >
      <SwiperSlide className="relative cursor-pointer">
        <Image src={Card01} alt="" width={480} height={270} />
        <div className="text-area">
          <div>
            <strong className="text-lg font-semibold mb-2">헬프미가 추천해준 햄버거</strong>
            <p>저칼로리인데 생각보다 맛있어요!!</p>
          </div>
          <div>
            <span>20대 여성</span>
            <p>체중 감량 목표</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer">
        <Image src={Card01} alt="" width={480} height={270} />
        <div className="text-area">
          <div>
            <strong className="text-lg font-semibold mb-2">두부 파스타를 만들었어요 </strong>
            <p>내용입니다 유저의 리뷰입니다</p>
          </div>
          <div>
            <span>20대 여성</span>
            <p>체중 감량 목표</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer">
        <Image src={Card02} alt="" width={480} height={270} />
        <div className="text-area">
          <div>
            <strong className="text-lg font-semibold mb-2">제목입니다</strong>
            <p>내용입니다 유저의 리뷰입니다</p>
          </div>
          <div>
            <span>20대 여성</span>
            <p>체중 감량 목표</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer">
        <Image src={Card01} alt="" width={480} height={270} />
        <div className="text-area">
          <div>
            <strong className="text-lg font-semibold mb-2">제목입니다</strong>
            <p>내용입니다 유저의 리뷰입니다</p>
          </div>
          <div>
            <span>20대 여성</span>
            <p>체중 감량 목표</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer">
        <Image src={Card02} alt="" width={480} height={270} />
        <div className="text-area">
          <div>
            <strong className="text-lg font-semibold mb-2">제목입니다</strong>
            <p>내용입니다 유저의 리뷰입니다</p>
          </div>
          <div>
            <span>20대 여성</span>
            <p>체중 감량 목표</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default MainSwiper;
