import Link from 'next/link';

const InfoMain = () => {
  return (
    <div>
      <div className="wx-3 justify-center content-center col-start-2 col-span-4 ">
        <h2 className="m-1 h-10 border-solid border-y-2 ">더이상 고민 없는, 나만의 영양사가 맞춰준 나를 위한 식단!</h2>
        <p className="m-1 h-10 items-center border-solid border-y-2 ">
          나의 정보를 입력하고 나를 위한 맞춤 식단을 받아 보세요
        </p>
      </div>
      <div>
        <Link href="/info-reaserch" className="col-start-1 col-end-7 border-dashed border-2 rounded">
          진단하러 가기
        </Link>
      </div>
    </div>
  );
};

export default InfoMain;
