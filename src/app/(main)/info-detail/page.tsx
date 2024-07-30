// import React from 'react';
'use client';
const InforDetailPage = () => {
  const handleClickAPICall = async () => {
    const content = await fetch('/api').then((response) => response.json());
    console.log('content', content);
  };

  return (
    <div className="flex justify-center place-items-center h-screen">
      <div className="items-center">
        <div>
          {/* 데이터 호출을 위한 임시 버튼 */}
          <div className="App">
            <button onClick={handleClickAPICall}>GPT Call</button>
          </div>
          <h1>dd님을 위한 맞춤 식단</h1>
          <p className="mb-4">AI를 통해 진단한 나의 정보에 맞춰 나만을 위한 식단을 매일 알려드려요</p>
        </div>
        <div className="flex">
          <div className="flex items-center justify-center mb-4">
            <div>
              <p className="mr-4">이미지 들어감</p>
              <h2 className="font-bold mb-2">아침 식단 제품</h2>
              <p className="mb-2">단호박, 달걀, 치킨</p>
              <p>Kcal</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div>
              <p>이미지 들어감</p>
              <h2 className="font-bold mb-2">점심 식단 제품</h2>
              <p className="mb-2">단호박, 달걀, 치킨</p>
              <p>Kcal</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div>
              <p>이미지 들어감</p>
              <h2 className="font-bold mb-2">저녁 식단 제품</h2>
              <p className="mb-2">단호박, 달걀, 치킨</p>
              <p>Kcal</p>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <h3>함께하면 좋은 운동</h3>
          <p>제공받은 식단과 함께 하면 더 건강한 방식으로 원하는 목표를 달성할 수 있어요</p>
          <div className="border border-gray p-4">
            <h4>ㅇㅇ운동</h4>
            <p>ㄴ아ㅓ루ㅏㅁ우라ㅓㅇ문라ㅜㅁ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InforDetailPage;
