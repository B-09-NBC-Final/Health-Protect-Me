import Link from 'next/link';

const InfoMain = () => {
  return (
    <div>
      <div>
        <h2> 더이상 고민 없는, 나만의 영양사가 맞춰준 나를 위한 식단!</h2>
        <p>나의 정보를 입력하고 나를 위한 맞춤 식단을 받아 보세요</p>
      </div>
      <div>
        <Link href="/info-reaserch">진단하러 가기</Link>
      </div>
    </div>
  );
};

export default InfoMain;
