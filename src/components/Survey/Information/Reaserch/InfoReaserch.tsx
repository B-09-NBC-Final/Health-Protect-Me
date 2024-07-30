'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Step, Gender, DietGoal, SurveyData } from '@/types/infoReaserch';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const InfoResearch = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [surveyData, setSurveyData] = useState<SurveyData>({
    birthYear: '',
    gender: null,
    height: '',
    weight: '',
    dietGoal: null
  });

  const [stepData, setStepData] = useState<Partial<SurveyData>[]>([
    { birthYear: '', gender: null },
    { height: '', weight: '' },
    { dietGoal: null }
  ]);

  const steps: Step[] = ['기본 정보', '신체 정보', '식단 목표'];
  const stepRefs = useRef<React.RefObject<HTMLDivElement>[]>(steps.map(() => React.createRef()));

  const nextStep = (): void => {
    if (currentStep < steps.length - 1) {
      // 현재 단계의 데이터를 stepData에 저장
      setStepData(prev => {
        const newStepData = [...prev];
        newStepData[currentStep] = { ...newStepData[currentStep], ...surveyData };
        return newStepData;
      });
      setCurrentStep(currentStep + 1);
      // 다음 단계의 데이터로 surveyData 업데이트
      setSurveyData(prev => ({ ...prev, ...stepData[currentStep + 1] }));
    }
  };

  const preStep = (): void => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // 이전 단계의 데이터로 surveyData 업데이트
      setSurveyData(prev => ({ ...prev, ...stepData[currentStep - 1] }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setSurveyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGenderSelect = (gender: Gender): void => {
    setSurveyData((prevData) => ({ ...prevData, gender }));
  };

  const handleDietGoalSelect = (dietGoal: DietGoal): void => {
    setSurveyData((prevData) => ({ ...prevData, dietGoal }));
  };

  useEffect(() => {
    stepRefs.current[currentStep].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, [currentStep]);

  return (
    <div className="max-w-2xl mx-auto mt-10 mb-4 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">{steps[currentStep]}</h1>
      <div className="mb-8 bg-gray-200 rounded-full h-2">
        <div
          className="bg-red-400 h-2 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>

      {/* 기본 정보 (출생년도와 성별) */}
      <div ref={stepRefs.current[0]} className={`mb-8 ${currentStep !== 0 && 'hidden'}`}>
        <div className="mb-4">
          <label className="block text-sm mb-2 font-medium text-gray-700">출생년도</label>
          <input
            type="text"
            name="birthYear"
            placeholder="예) 1995년"
            value={surveyData.birthYear}
            onChange={handleInputChange}
            className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2 font-medium text-gray-700">성별</label>
          <div className="flex space-x-4">
            <button
              onClick={() => handleGenderSelect('남')}
              className={`flex-1 py-2 px-4 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 ${
                surveyData.gender === '남' ? 'bg-red-100' : ''
              }`}
            >
              남자
            </button>
            <button
              onClick={() => handleGenderSelect('여')}
              className={`flex-1 py-2 px-4 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 ${
                surveyData.gender === '여' ? 'bg-red-100' : ''
              }`}
            >
              여자
            </button>
          </div>
        </div>
      </div>

      <div ref={stepRefs.current[1]} className={`mb-8 ${currentStep !== 1 && 'hidden'}`}>
        <div className="mb-4">
          <label className="block text-sm mb-2 font-medium text-gray-700">키</label>
          <input
            type="text"
            name="height"
            placeholder="174cm"
            value={surveyData.height}
            onChange={handleInputChange}
            className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2 font-medium text-gray-700">체중</label>
          <input
            type="text"
            name="weight"
            placeholder="70kg"
            value={surveyData.weight}
            onChange={handleInputChange}
            className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
          />
        </div>
      </div>

      <div ref={stepRefs.current[2]} className={`mb-8 ${currentStep !== 2 && 'hidden'}`}>
        <p className="text-lg mb-4 font-medium text-gray-700">식단을 통해 이루고자 하는 목표를 입력해주세요</p>
        <div className="grid grid-cols-1 gap-2">
          {['체중을 감량하고 싶어요', '체중을 증량하고 싶어요', '건강한 식생활 하고 싶어요'].map((goal) => (
            <button
              key={goal}
              onClick={() => handleDietGoalSelect(goal as DietGoal)}
              className={`py-2 px-4 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 ${
                surveyData.dietGoal === goal ? 'bg-red-100' : ''
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        {currentStep > 0 && (
          <Button
            onClick={preStep}
            className="py-3 px-6 text-lg text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
          >
            이전
          </Button>
        )}
        {currentStep < steps.length - 1 ? (
          <Button
            onClick={nextStep}
            className="py-3 px-6 text-lg bg-red-400 text-white rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
          >
            다음
          </Button>
        ) : (
          <Button className="py-3 px-6 text-lg bg-red-400 text-white rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200">
            <Link href="/info-detail">결과보기</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default InfoResearch;