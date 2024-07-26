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
      spaceBetween={20}
      slidesPerView={4}
      direction={'vertical'}
      loop={true}
      allowTouchMove={false}
      speed={2000}
      observer={true}
      autoplay={{
        delay: 0,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
        reverseDirection: reverseDirection
      }}
    >
      <SwiperSlide className="relative cursor-pointer w-[420px] !h-[230px]">
        <Image src={Card01} alt="" width={420} height={230} />
        <div className="text-area">
          <strong>제목입니다</strong>
          <p>내용입니다 유저의 리뷰입니다</p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer w-[420px] !h-[230px]">
        <Image src={Card02} alt="" width={420} height={230} />
        <div className="text-area">
          <strong>제목입니다</strong>
          <p>내용입니다 유저의 리뷰입니다</p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer w-[420px] !h-[230px]">
        <Image src={Card01} alt="" width={420} height={230} />
        <div className="text-area">
          <strong>제목입니다</strong>
          <p>내용입니다 유저의 리뷰입니다</p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer w-[420px] !h-[230px]">
        <Image src={Card01} alt="" width={420} height={230} />
        <div className="text-area">
          <strong>제목입니다</strong>
          <p>내용입니다 유저의 리뷰입니다</p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer w-[420px] !h-[230px]">
        <Image src={Card02} alt="" width={420} height={230} />
        <div className="text-area">
          <strong>제목입니다</strong>
          <p>내용입니다 유저의 리뷰입니다</p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default MainSwiper;
