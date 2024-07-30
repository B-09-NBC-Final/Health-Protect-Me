'use client'
import React from 'react';

const InforDetailPage = () => {
  const [mealPlan, setMealPlan] = React.useState({
    breakfast: '',
    lunch: '',
    dinner: '',
    exercise: '',
  });

  // const handleClickAPICall = async () => {
  //   const response = await fetch("/api/gpt");
  //   const data = await response.json();

  //   const content = data.data;
  //   const splitContent = content.split('###');

  //   // 분리된 내용을 각각의 상태에 저장
  //   setMealPlan({
  //     breakfast: splitContent[1] || '',
  //     lunch: splitContent[2] || '',
  //     dinner: splitContent[3] || '',
  //     exercise: splitContent[4] || '',
  //   });

  //   // 각 섹션을 콘솔에 출력 (디버깅용)
  //   splitContent.forEach((section, index) => {
  //     console.log(`Section ${index + 1}:`, section);
  //   });
  // };
  const handleClickAPICall = async () => {
    try {
      const response = await fetch("/api/gpt");
      const content = await response.json();

      // JSON 형식으로 저장할 수 있는 객체로 변환
      const jsonContent = JSON.stringify(content);

      // localStorage에 저장
      localStorage.setItem("gptContent", jsonContent);

      console.log("content", jsonContent);
    } catch (error) {
      console.error("Error fetching the content:", error);
    }
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
              <h2 className="font-bold mb-2">아침 메뉴</h2>
              <p className="mb-2">{mealPlan.breakfast}</p> {/* 아침 식단 제품 */}
              <p>Kcal</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div>
              <p>이미지 들어감</p>
              <h2 className="font-bold mb-2">점심 메뉴</h2>
              <p className="mb-2">{mealPlan.lunch}</p> {/* 점심 식단 제품 */}
              <p>Kcal</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div>
              <p>이미지 들어감</p>
              <h2 className="font-bold mb-2">저녁 메뉴</h2>
              <p className="mb-2">{mealPlan.dinner}</p> {/* 저녁 식단 제품 */}
              <p>Kcal</p>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <h3>함께하면 좋은 운동</h3>
          <p>제공받은 식단과 함께 하면 더 건강한 방식으로 원하는 목표를 달성할 수 있어요</p>
          <div className="border border-gray p-4">
            <h4>운동</h4>
            <p>{mealPlan.exercise}</p> {/* 함께하면 좋은 운동 */}
          </div>
        </div>
      </div>
    </div>
  );
};


export default InforDetailPage;
