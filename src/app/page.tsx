import MainSwiper from '@/components/MainPage/MainSwiper';

const MainPage = () => {
  return (
    <main>
      <div className="bg-neutral-800 min-h-screen">
        <div className="flex justify-between items-center">
          <MainSwiper reverseDirection={false} />
          <p className="text-white text-2xl">사용자들의 이야기</p>
          <MainSwiper reverseDirection={true} />
        </div>
      </div>
    </main>
  );
};

export default MainPage;
