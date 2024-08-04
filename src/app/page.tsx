import MainContent from '@/components/MainPage/MainContent';
import MainSwiper from '@/components/MainPage/MainSwiper';
import Image from 'next/image';
import main01 from '@/assets/image/img_main01.svg';
import main02 from '@/assets/image/img_main02.svg';
import main03 from '@/assets/image/img_main03.svg';
import MainBanner from '@/components/MainPage/MainBanner';
import MainSwiperReverse from '@/components/MainPage/MainSwiperReverse';
import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer';

const MainPage = () => {
  return (
    <>
      <Header />
      <main className="w-full bg-default">
        <MainContent />
        <section className="swiper-area">
          <div className="inner_wrap flex justify-between">
            <MainSwiper />
            <div className="flex flex-col justify-center items-center">
              <p className="text-white text-2xl font-medium">사용자들의 이야기</p>
              <p className="text-white opacity-60">추천 식단과 함께한 경험</p>
            </div>
            <MainSwiperReverse />
          </div>
        </section>
        <section className="inner_wrap">
          <ul className="pb-40">
            <li className="flex justify-between pt-40 pl-40">
              <div className="pt-[156px]">
                <p className="text-main-title2 text-gray900 font-medium leading-tight tracking-tight">
                  나에게 맞는 <br />
                  맞춤 식단을 간편하게 확인
                </p>
                <p className="text-lg mt-2 text-gray600 tracking-tight">
                  나의 건강 상태와 목표에 맞춘 식단을 AI가 매일 자동으로 추천합니다. <br />
                  균형잡힌 영양소 정보를 바탕으로 다양한 식단을 안내해 드려요.
                </p>
              </div>
              <Image src={main01} alt="간편하게, 나만을 위한 맞춤형 건강 솔루션" width={600} height={480} />
            </li>
            <li className="flex justify-between pt-40">
              <Image src={main02} alt="간편하게, 나만을 위한 맞춤형 건강 솔루션" width={600} height={480} />
              <div className="w-[600px] pt-[156px]">
                <p className="text-main-title2 text-gray900 font-medium leading-tight tracking-tight">
                  목표 달성을 <br />
                  도와줄 최적화된 운동 플랜
                </p>
                <p className="text-lg mt-2 text-gray600 tracking-tight">
                  개인 맞춤형으로 설계된 운동 플랜으로 더 효과적인 건강관리를 할 수 있어요. <br />
                  간단한 운동 가이드와 함께 효율적으로 목표를 달성해 보세요.
                </p>
              </div>
            </li>
            <li className="flex justify-between pt-40 pl-40">
              <div className="pt-[156px]">
                <p className="text-main-title2 text-gray900 font-medium leading-tight tracking-tight">
                  건강한 <br />
                  라이프스타일을 위한 커뮤니티
                </p>
                <p className="text-lg mt-2 text-gray600 tracking-tight">
                  혼자라서 어려웠던 경험, 한 번쯤은 있지 않으셨나요? <br />
                  비슷한 목표를 가진 사람들과 소통하고, 성공적인 경험을 나누어 보세요.
                </p>
              </div>
              <Image src={main03} alt="간편하게, 나만을 위한 맞춤형 건강 솔루션" width={600} height={480} />
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
