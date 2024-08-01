import MainContent from '@/components/MainPage/MainContent';
import MainSwiper from '@/components/MainPage/MainSwiper';
import Image from 'next/image';
import Thumbnail from '@/assets/image/img_thumbnail.svg';
import MainBanner from '@/components/MainPage/MainBanner';

const MainPage = () => {
  return (
    <main>
      <MainContent />
      <section className="swiper-area">
        <div className="inner_wrap flex justify-between">
          <MainSwiper reverseDirection={true} />
          <p className="text-white text-2xl font-medium flex items-center">사용자들의 이야기</p>
          <MainSwiper reverseDirection={false} />
        </div>
      </section>
      <section className="inner_wrap">
        <ul className="mb-40">
          <li className="flex justify-between pt-40 pl-40">
            <div>
              <p className="text-main-title2 font-medium leading-tight">
                나에게 맞는 <br />
                맞춤 식단을 간편하게 확인
              </p>
              <p className="text-sub-title font-medium mt-2">
                나의 건강 상태와 목표에 맞춘 식단을 AI가 매일 자동으로 추천합니다. <br />
                균형잡힌 영양소 정보를 바탕으로 다양한 식단을 안내해 드려요.
              </p>
            </div>
            <Image src={Thumbnail} alt="간편하게, 나만을 위한 맞춤형 건강 솔루션" width={600} height={480} />
          </li>
          <li className="flex justify-between pt-40">
            <Image src={Thumbnail} alt="간편하게, 나만을 위한 맞춤형 건강 솔루션" width={600} height={480} />
            <div className="w-[600px]">
              <p className="text-main-title2 font-medium leading-tight">
                목표 달성을 <br />
                도와줄 최적화된 운동 플랜
              </p>
              <p className="text-sub-title font-medium mt-2">
                개인 맞춤형으로 설계된 운동 플랜으로 더 효과적인 건강관리를 할 수 있어요. <br />
                간단한 운동 가이드와 함께 효율적으로 목표를 달성해 보세요.
              </p>
            </div>
          </li>
          <li className="flex justify-between pt-40 pl-40">
            <div>
              <p className="text-main-title2 font-medium leading-tight">
                건강한 <br />
                라이프스타일을 위한 커뮤니티
              </p>
              <p className="text-sub-title font-medium mt-2">
                혼자라서 어려웠던 경험, 한 번쯤은 있지 않으셨나요? <br />
                비슷한 목표를 가진 사람들과 소통하고, 성공적인 경험을 나누어 보세요.
              </p>
            </div>
            <Image src={Thumbnail} alt="간편하게, 나만을 위한 맞춤형 건강 솔루션" width={600} height={480} />
          </li>
        </ul>
      </section>
      <section className="bg-gray100">
        <MainBanner />
      </section>
    </main>
  );
};

export default MainPage;
