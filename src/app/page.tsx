import MainSwiper from '@/components/MainPage/MainSwiper';
import Image from 'next/image';
import Thumbnail from '@/assets/image/img_thumbnail.svg';
import Button from '@/components/common/Button';

const MainPage = () => {
  const checkDiet = () => {};
  return (
    <main>
      <div className="inner_wrap">
        <div className="flex justify-between items-end py-40">
          <div>
            <h2 className="text-5xl font-medium leading-tight mb-10">
              간편하게, 나만을 위한 <br />
              맞춤형 건강 솔루션
            </h2>
            <Button buttonName="맞춤 식단 제공받기" onClick={checkDiet}></Button>
          </div>
          <Image src={Thumbnail} alt="간편하게, 나만을 위한 맞춤형 건강 솔루션" width={790} height={606} />
        </div>
      </div>

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
