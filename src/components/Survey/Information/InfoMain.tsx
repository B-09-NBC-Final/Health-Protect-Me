import Link from 'next/link';

const InfoMain = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 py-2 border-gray-200">
            더이상 고민 없이, 나만의 영양사가 맞춰준 나를 위한 식단!
          </h1>
          <p className="text-lg text-gray-600 py-2  border-gray-200">
            나의 정보를 입력하고 나만을 위한 맞춤 식단을 받아 보세요
          </p>
        </div>
        <div className="text-center">
          <Link
            href="/info-reaserch"
            className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            진단하러 가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoMain;
