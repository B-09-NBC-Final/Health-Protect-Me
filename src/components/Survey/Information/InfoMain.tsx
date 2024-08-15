import { Button } from '@/components/ui/button';
import Link from 'next/link';

const InfoMain = () => {
  return (
    <div className="w-full max-w-[51rem] mx-5 s:mt-[120px] mt-40 px-4 s:px-0">
      <h2 className="text-2xl s:text-2xl font-bold mb-4 text-center text-gray-900">
        나에게 맞는 맞춤 식단으로 개인화된 건강 관리를 시작해보세요
      </h2>
      <p className="text-sm s:text-base s:items-start text-center mb-10 text-gray-600">
        나의 건강한 일상을 위해 설문을 입력하고<br className="hidden sm:inline" /> 나만의 AI 헬스케어 전문가들이 매일 새로운 식단과 운동을 추천해드립니다.
      </p>
      <div className="flex justify-center mt-20 s:mt-20 s:mb-[388px]">
        <Button className="w-full s:w-[320px] s:p-[16px] h-12 bg-[#FF7A85] text-white text-base rounded-lg hover:bg-[#FF7A85] transition duration-300">
          <Link href="/info-reaserch">진단하러 가기</Link>
        </Button>
      </div>
    </div>
  );
};

export default InfoMain;