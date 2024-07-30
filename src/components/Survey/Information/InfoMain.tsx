import { Button } from '@/components/ui/button';
import Link from 'next/link';

const InfoMain = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-8">
        <h1 className="text-sm text-gray-600 mb-8">
          나에게 맞는 맞춤 식단으로 개인화된 건강 관리를 시작해보세요
        </h1>
        <p className="text-xs text-gray-400 mb-8">
          나의 건강한 일상을 위해 체중과 건강 정보를 입력하시면 식단과 함께 건강 조언을 무료로 받으실 수 있습니다
        </p>
        </div>
        <div className="text-center">
          <Button className='className="w-full py-3 bg-[#FF7A85] text-white text-sm font-semibold rounded-md hover:bg-red-500 transition duration-300"'>
            <Link href="/info-reaserch">진단하러 가기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoMain;