'use client'; // Next.js 13 이상에서 클라이언트 컴포넌트임을 명시

import React, { useState, useRef, useEffect } from 'react';

// 설문 입력지에 대한 정보 type
type Step = '출생년도' | '성별' | '신장' | '체중' | '식단 목적';
type Gender = '남' | '여';
type DietGoal = '체중 감량' | '체중 유지' | '건강 식습관' | '체중 증량';

// 데이터 구조 type 지정
type SurveyData = {
  birthYear: string;
  gender: Gender | null;
  height: string;
  weight: string;
  dietGoal: DietGoal | null;
};

const InfoResearch = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  // 사용자가 작성한 설문 응답 초기값
  const [surveyData, setSurveyData] = useState<SurveyData>({
    birthYear: '',
    gender: null,
    height: '',
    weight: '',
    dietGoal: null
  });

  // 설문단계의 배열 정렬
  const steps: Step[] = ['출생년도', '성별', '신장', '체중', '식단 목적'];

  const stepRefs = useRef<React.RefObject<HTMLDivElement>[]>(steps.map(() => React.createRef()));

  const nextStep = (): void => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setSurveyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGenderSelect = (gender: Gender): void => {
    setSurveyData((prevData) => ({ ...prevData, gender }));
    nextStep();
  };

  const handleDietGoalSelect = (dietGoal: DietGoal): void => {
    setSurveyData((prevData) => ({ ...prevData, dietGoal }));
    nextStep();
  };

  // 설문 후 다음 단계로 넘어가게 하는(스크롤)
  useEffect(() => {
    stepRefs.current[currentStep].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, [currentStep]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">설문조사</h1>

      {/* progress bar 구현 파트 */}
      <div className="mb-8 bg-gray-200 rounded-full h-4">
        <div
          className="bg-violet-700 h-4 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>

      <div ref={stepRefs.current[0]} className={`mb-8 ${currentStep !== 0 && 'hidden'}`}>
        <label className="block text-xl mb-2 font-medium text-gray-700">출생년도는 언제인가요?</label>
        <input
          type="text"
          name="birthYear"
          placeholder="19xx년"
          value={surveyData.birthYear}
          onChange={handleInputChange}
          className="w-full p-3 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div ref={stepRefs.current[1]} className={`mb-8 ${currentStep !== 1 && 'hidden'}`}>
        {/* 설문 항목 순서 명시 */}
        <p className="text-xl mb-4 font-medium text-gray-700">성별(Gender)은 무엇인가요?</p>
        <div className="flex space-x-4">
          <button
            onClick={() => handleGenderSelect('남')}
            className="flex-1 py-3 px-6 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            남(Male)
          </button>
          <button
            onClick={() => handleGenderSelect('여')}
            className="flex-1 py-3 px-6 text-lg bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          >
            여(Female)
          </button>
        </div>
      </div>

      <div ref={stepRefs.current[2]} className={`mb-8 ${currentStep !== 2 && 'hidden'}`}>
        {/* 설문 항목 순서 명시 */}
        <label className="block text-xl mb-2 font-medium text-gray-700">신장이 어떻게 되나요?</label>
        <input
          type="text"
          name="height"
          placeholder="cm"
          value={surveyData.height}
          onChange={handleInputChange}
          className="w-full p-3 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div ref={stepRefs.current[3]} className={`mb-8 ${currentStep !== 3 && 'hidden'}`}>
        {/* 설문 항목 순서 명시 */}
        <label className="block text-xl mb-2 font-medium text-gray-700">체중이 어떻게 되나요?</label>
        <input
          type="text"
          name="weight"
          placeholder="kg"
          value={surveyData.weight}
          onChange={handleInputChange}
          className="w-full p-3 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div ref={stepRefs.current[4]} className={`mb-8 ${currentStep !== 4 && 'hidden'}`}>
        {/* 설문 항목 순서 명시 */}
        <p className="text-xl mb-4 font-medium text-gray-700">식단 목적은 무엇인가요?</p>
        <div className="grid grid-cols-2 gap-4">
          {(['체중 감량', '체중 유지', '건강 식습관', '체중 증량'] as DietGoal[]).map((goal) => (
            <button
              key={goal}
              onClick={() => handleDietGoalSelect(goal)}
              className="py-3 px-6 text-lg bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200"
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      {/* 다음 단계로 넘어갈 수 있게 하고 마지막 설문에서는 멈추게 해놓기 */}
      {currentStep < steps.length - 1 && (
        <button
          onClick={nextStep}
          className="w-full py-3 px-6 text-lg bg-green-500 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
        >
          다음
        </button>
      )}
      {/* 마지막 설문에서의 제출 클릭 시, 제출할 수 있게 만들기  */}
      {currentStep === steps.length - 1 && (
        <button className="w-full py-3 px-6 text-lg bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200">
          제출하기
        </button>
      )}
    </div>
  );
};

export default InfoResearch;
