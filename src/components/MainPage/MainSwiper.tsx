'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import Image from 'next/image';
import Card01 from '@/assets/image/img_main_card01.png';
import Card02 from '@/assets/image/img_main_card02.png';
import Card03 from '@/assets/image/img_main_card03.png';
import Card04 from '@/assets/image/img_main_card04.png';
import Card05 from '@/assets/image/img_main_card05.png';
import Card06 from '@/assets/image/img_main_card06.png';
import Card07 from '@/assets/image/img_main_card07.png';

const MainSwiper = () => {
  SwiperCore.use([Autoplay]);

  return (
    <Swiper
      className="text-white max-h-screen s:block"
      spaceBetween={16}
      slidesPerView={'auto'}
      direction={'horizontal'}
      loop={true}
      speed={4000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false
      }}
      breakpoints={{
        767: {
          direction: 'horizontal',
          spaceBetween: 40,
          speed: 4000
        },
        1280: {
          direction: 'vertical',
          spaceBetween: 40,
          speed: 2500
        }
      }}
    >
      <SwiperSlide className="relative cursor-pointer !h-[260px] ml:!h-[230px] ml:!w-[420px] xs:!h-[146px] xs:!w-[270px]">
        <Image src={Card01} alt="" width={480} height={260} />
        <div className="text-area xs:!p-4 xs:!pb-2">
          <div>
            <strong className="text-lg font-semibold mb-2 s:line-clamp-1 xs:text-sm">
              추천 식단에 따라 스테이크를 포함한 저녁을 먹어봤습니다.
            </strong>
            <p className="s:line-clamp-3 xs:text-xs">
              구운 채소랑 현미밥과 같이 먹으니 좀 더 건강한 느낌이었고 균형 잡힌 식단으로 좋았어요. 스테이크도 너무
              부드럽고 맛있었네요. 체중 관리하면서 단백질 보충해야 하시는 분 추천드려요.
            </p>
          </div>
          <div className="text-gray300 xs:text-xs">
            <span>20대 여성</span>
            <p>체중 감량 목표</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer !h-[260px] ml:!h-[230px] ml:!w-[420px] s:!h-[230px] s:!w-[420px] xs:!h-[146px] xs:!w-[270px]">
        <Image src={Card02} alt="" width={480} height={260} />
        <div className="text-area xs:!p-4 xs:!pb-2">
          <div>
            <strong className="text-lg font-semibold mb-2 s:line-clamp-1 xs:text-sm">
              간식으로 팬 케이크 만들었습니다
            </strong>
            <p className="s:line-clamp-3 xs:text-xs">간식까지 추천해줘서 좋아요!! 식사 보충 겸 간식까지~</p>
          </div>
          <div className="text-gray300 xs:text-xs">
            <span>20대 여성</span>
            <p>건강 식사 목표</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer !h-[260px] ml:!h-[230px] ml:!w-[420px] s:!h-[230px] s:!w-[420px] xs:!h-[146px] xs:!w-[270px]">
        <Image src={Card03} alt="" width={480} height={260} />
        <div className="text-area xs:!p-4 xs:!pb-2">
          <div>
            <strong className="text-lg font-semibold mb-2 s:line-clamp-1 xs:text-sm">
              식단 고민할 필요가 없어져서 편해요
            </strong>
            <p className="s:line-clamp-3 xs:text-xs">
              매일 퇴근하면서 저녁 뭐 먹지 고민하다가 배민키고 시켜먹는게 일상이었는데, 식단대로 먹기만 하면 되니 돈도
              절약되고 편합니다.
            </p>
          </div>
          <div className="text-gray300 xs:text-xs">
            <span>30대 여성</span>
            <p>체중 증량 목표</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer !h-[260px] ml:!h-[230px] ml:!w-[420px] s:!h-[230px] s:!w-[420px] xs:!h-[146px] xs:!w-[270px]">
        <Image src={Card04} alt="" width={480} height={260} />
        <div className="text-area xs:!p-4 xs:!pb-2">
          <div>
            <strong className="text-lg font-semibold mb-2 s:line-clamp-1 xs:text-sm">다이어트 식단으로 효과적</strong>
            <p className="s:line-clamp-3 xs:text-xs">
              체중 감량으로 선택하니 적당히 포만감도 있는데 다이어트에 효과적이에요..!
            </p>
          </div>
          <div className="text-gray300 xs:text-xs">
            <span>20대 남성</span>
            <p>체중 감량 목표</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer !h-[260px] ml:!h-[230px] ml:!w-[420px] s:!h-[230px] s:!w-[420px] xs:!h-[146px] xs:!w-[270px]">
        <Image src={Card05} alt="" width={480} height={260} />
        <div className="text-area xs:!p-4 xs:!pb-2">
          <div>
            <strong className="text-lg font-semibold mb-2 s:line-clamp-1 xs:text-sm">
              건강한 식사하고 싶어서 이용했는데
            </strong>
            <p className="s:line-clamp-3 xs:text-xs">
              건강 식사 목표로 선택하고 식단대로 먹으니 몸이 건강해진 기분입니다. 추천 식단과 괜찮은 상품을 연결해주면
              더 좋을 것 같아요.
            </p>
          </div>
          <div className="text-gray300 xs:text-xs">
            <span>30대 남성</span>
            <p>건강 식사 목표</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer !h-[260px] ml:!h-[230px] ml:!w-[420px] s:!h-[230px] s:!w-[420px] xs:!h-[146px] xs:!w-[270px]">
        <Image src={Card06} alt="" width={480} height={260} />
        <div className="text-area xs:!p-4 xs:!pb-2">
          <div>
            <strong className="text-lg font-semibold mb-2 s:line-clamp-1 xs:text-sm">
              헬프미를 사용한 이후로 체중 관리가 잘 돼요.
            </strong>
            <p className="s:line-clamp-3 xs:text-xs">
              매일 AI가 제공해주는 맞춤형 식단 덕분에 건강한 식사를 손쉽게 할 수 있었고, 운동 추천도 제 개인 목표에 맞게
              잘 맞춰져 있는 것 같아 효과를 느끼고 있습니다. 또 직관적이고 보기 쉬운 인터페이스라 매일매일 사용하게 되는
              것 같아요.
            </p>
          </div>
          <div className="text-gray300 xs:text-xs">
            <span>20대 남성</span>
            <p>건강 감량 목표</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative cursor-pointer !h-[260px] ml:!h-[230px] ml:!w-[420px] s:!h-[230px] s:!w-[420px] xs:!h-[146px] xs:!w-[270px]">
        <Image src={Card07} alt="" width={480} height={260} />
        <div className="text-area xs:!p-4 xs:!pb-2">
          <div>
            <strong className="text-lg font-semibold mb-2 s:line-clamp-1 xs:text-sm">식단 추천에 운동까지.</strong>
            <p className="s:line-clamp-3 xs:text-xs">
              식단을 관리받고 싶어서 이용했는데, 원래 운동도 해야지.. 하고만 생각하고 있었는데 집에서 간단히 할 수 있는
              것들을 추천해주니 같이 하게 돼요!!
            </p>
          </div>
          <div className="text-gray300 xs:text-xs">
            <span>30대 여성</span>
            <p>건강 감량 목표</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default MainSwiper;
