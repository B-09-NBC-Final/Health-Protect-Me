import { Button } from '@/components/ui/button';
import Link from 'next/link';

const InfoMain = () => {
  return (
    <div className="flex flex-col items-center gap-20 justify-center  bg-[#F8FAF8]  ">
      <div className="max-w-4xl w-full mx-auto p-10 m-10 flex flex-col items-center gap-40 bg-white rounded-lg">
        <div className="text-center mb-8 flex flex-col gap-2">
        <h1 className="text-2xl text-center not-italic font-medium leading-8 text-black mb-8">
          나에게 맞는 맞춤 식단으로 개인화된 건강 관리를 시작해보세요
        </h1>
        <p className="self-stretch text-base text-center not-italic font-normal leading-6 text-[#585B5F] mb-8">
          나의 건강한 일상을 위해 설문을 입력하고 나만의 AI 헬스케어 전문가들이 매일 새로운 식단과 운동을 추천해드립니다.
        </p>
        </div>
        <div className="text-center items-center justify-center  flex p-4 w-[400px] ">
          <Button className='className="w-full p-4 w-56 h-12 bg-[#FF7A85] text-white text-lg font-semibold rounded-[8px] hover:bg-red-500 transition duration-300"'>
            <Link href="/info-reaserch">진단하러 가기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoMain;