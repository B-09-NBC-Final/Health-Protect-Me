import MainContent from '@/components/MainPage/MainContent';
import MainSwiper from '@/components/MainPage/MainSwiper';

const MainPage = () => {
  return (
    <main>
      <MainContent />
      <div className="swiper-area">
        <div className="flex justify-between items-center">
          <MainSwiper reverseDirection={true} />
          <p className="text-white text-2xl font-medium">사용자들의 이야기</p>
          <MainSwiper reverseDirection={false} />
        </div>
      </div>
    </main>
  );
};

export default MainPage;
