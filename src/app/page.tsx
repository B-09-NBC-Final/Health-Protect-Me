'use client';

import MainContent from '@/components/MainPage/MainContent';
import MainSwiper from '@/components/MainPage/MainSwiper';
import Image from 'next/image';
import main01 from '@/assets/image/img_main01.png';
import main02 from '@/assets/image/img_main02.png';
import main03 from '@/assets/image/img_main03.png';
import MainBanner from '@/components/MainPage/MainBanner';
import MainSwiperReverse from '@/components/MainPage/MainSwiperReverse';
import Header from '@/components/Common/Header/Header';
import Footer from '@/components/Common/Footer';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

const MainPage = () => {
  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  return (
    <>
      <Header />
      <main className="w-full bg-default">
        <MainContent />
        <section className="swiper-area ml:h-full ml:py-20">
          <div className="ml:max-w-container-ml max-w-container-l mx-auto flex justify-between px-10 s:max-w-container-s xs:max-w-container-xs xs:px-5 ml:block">
            <MainSwiper />
            <div className="flex flex-col justify-center items-center ml:block ml:py-20 ml:text-center">
              <p className="text-white text-2xl font-medium">사용자들의 이야기</p>
              <p className="text-white opacity-60">추천 식단과 함께한 경험</p>
            </div>
            <MainSwiperReverse />
          </div>
        </section>
        <section className="max-w-container-l mx-auto px-10 m:max-w-container-m s:max-w-container-s xs:max-w-container-xs xs:px-5">
          <ul className="pb-40 s:pb-20">
            <li className="flex justify-between pt-40 pl-40 ml:pl-0 s:flex-col s:pt-20 s:pl-0">
              <div className="flex flex-col justify-center mr-10 s:pt-0 s:mr-0">
                <p className="text-main-title2 text-gray900 font-medium leading-tight tracking-tight ml:text-[36px] s:text-2xl">
                  나에게 맞는 <br />
                  맞춤 식단을 간편하게 확인
                </p>
                <p className="text-lg mt-2 text-gray600 tracking-tight s:text-base s:mb-10">
                  나의 건강 상태와 목표에 맞춘 식단을 AI가 매일 자동으로 추천합니다. <br />
                  균형잡힌 영양소 정보를 바탕으로 다양한 식단을 안내해 드려요.
                </p>
              </div>
              <div data-aos="fade-left" className="s:flex s:justify-end">
                <Image src={main01} alt="간편하게, 나만을 위한 맞춤형 건강 솔루션" width={600} height={480} />
              </div>
            </li>
            <li className="flex justify-between pt-40 s:flex-col-reverse s:pt-20">
              <div data-aos="fade-right">
                <Image src={main02} alt="간편하게, 나만을 위한 맞춤형 건강 솔루션" width={600} height={480} />
              </div>
              <div className="flex flex-col justify-center w-[600px] ml-10 s:pt-0 s:w-full s:ml-0">
                <p className="text-main-title2 text-gray900 font-medium leading-tight tracking-tight ml:text-[36px] s:text-2xl">
                  목표 달성을 <br />
                  도와줄 최적화된 운동 플랜
                </p>
                <p className="text-lg mt-2 text-gray600 tracking-tight s:text-base s:mb-10">
                  개인 맞춤형으로 설계된 운동 플랜으로 더 효과적인 건강관리를 할 수 있어요. <br />
                  간단한 운동 가이드와 함께 효율적으로 목표를 달성해 보세요.
                </p>
              </div>
            </li>
            <li className="flex justify-between pt-40 pl-40 ml:pl-0 s:flex-col s:pt-20 s:pl-0">
              <div className="flex flex-col justify-center mr-10 s:pt-0 s:mr-0">
                <p className="text-main-title2 text-gray900 font-medium leading-tight tracking-tight ml:text-[36px] s:text-2xl">
                  건강한 <br />
                  라이프스타일을 위한 커뮤니티
                </p>
                <p className="text-lg mt-2 text-gray600 tracking-tight s:text-base s:mb-10">
                  혼자라서 어려웠던 경험, 한 번쯤은 있지 않으셨나요? <br />
                  비슷한 목표를 가진 사람들과 소통하고, 성공적인 경험을 나누어 보세요.
                </p>
              </div>
              <div data-aos="fade-left" className="s:flex s:justify-end">
                <Image src={main03} alt="간편하게, 나만을 위한 맞춤형 건강 솔루션" width={600} height={480} />
              </div>
            </li>
          </ul>
        </section>
        <section className="bg-gray100">
          <MainBanner />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default MainPage;
