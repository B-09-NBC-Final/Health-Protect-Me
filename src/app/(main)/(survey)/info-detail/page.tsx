// import React from 'react';

const InforDetailPage = () => {
  return (
    <div className="items-center">
      <div>
        <h2 className="mb-4">dd님을 위한 맞춤 식단</h2>
        <p className="mb-4">AI를 통해 진단한 나의 정보에 맞춰 나만을 위한 식단을 매일 알려드려요</p>
      </div>
      <div className="flex">
        <div className="flex items-center mb-4">
          <p>이미지 들어감</p>
          <div>
            <h3 className="font-bold mb-2">아침 식단 제품</h3>
            <p className="mb-2">단호박 255g, 달걀 3개, 치킨 70g</p>
            <p>Kcal</p>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <p>이미지 들어감</p>
          <div>
            <h3 className="font-bold mb-2">점심 식단 제품</h3>
            <p className="mb-2">단호박, 달걀, 치킨</p>
            <p>Kcal</p>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <p>이미지 들어감</p>
          <div>
            <h3 className="font-bold mb-2">저녁 식단 제품</h3>
            <p className="mb-2">단호박, 달걀, 치킨</p>
            <p>Kcal</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default InforDetailPage;
