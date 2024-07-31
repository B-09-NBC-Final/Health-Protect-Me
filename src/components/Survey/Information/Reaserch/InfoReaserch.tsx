'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Step, Gender, DietGoal, SurveyData } from '@/types/infoReaserch';
import { Button } from '@/components/ui/button';
import { createClient } from '@/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useUserStore } from '@/store/userStore';

const supabase = createClient();

const InfoResearch = (): JSX.Element => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [surveyData, setSurveyData] = useState<SurveyData>({
    user_id: '',
    birthYear: '',
    gender: null,
    height: '',
    weight: '',
    purpose: null
  });

  const steps: Step[] = ['출생년도', '성별', '신장', '체중', '식단 목적'];
  const stepRefs = useRef<React.RefObject<HTMLDivElement>[]>(steps.map(() => React.createRef()));

  const nextStep = (): void => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const preStep = (): void => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setSurveyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGenderSelect = (gender: Gender): void => {
    setSurveyData((prevData) => ({ ...prevData, gender }));
  };

  const handleDietGoalSelect = (purpose: DietGoal): void => {
    setSurveyData((prevData) => ({ ...prevData, purpose }));
  };

  useEffect(() => {
    stepRefs.current[currentStepIndex].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, [currentStepIndex]);

  console.log(user?.userId);

  const saveDataToSupabase = async () => {
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');

    try {
      const { data, error } = await supabase.from('information').insert({
        user_id: user?.userId,
        created_at: timestamp,
        year_of_birth: surveyData.height,
        gender: surveyData.gender,
        height: surveyData.height,
        weight: surveyData.weight,
        purpose: surveyData.purpose
      });

      if (error) throw error;

      toast.success('데이터가 성공적으로 저장되었습니다!');
      router.push('/info-detail');
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('데이터 저장 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const isStepValid = (): boolean => {
    switch (steps[currentStepIndex]) {
      case '출생년도':
        return !!surveyData.birthYear;
      case '성별':
        return !!surveyData.gender;
      case '신장':
        return !!surveyData.height;
      case '체중':
        return !!surveyData.weight;
      case '식단 목적':
        return !!surveyData.purpose;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (steps[currentStepIndex]) {
      case '출생년도':
        return (
          <div ref={stepRefs.current[0]} className="mb-4">
            <label className="block text-sm mb-2 font-medium text-gray-700">출생년도</label>
            <input
              type="text"
              name="birthYear"
              placeholder="예) 19xx "
              value={surveyData.birthYear}
              onChange={handleInputChange}
              className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
            />
          </div>
        );
      case '성별':
        return (
          <div ref={stepRefs.current[1]} className="mb-4">
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
        );
      case '신장':
        return (
          <div ref={stepRefs.current[2]} className="mb-4">
            <label className="block text-sm mb-2 font-medium text-gray-700">신장</label>
            <input
              type="text"
              name="height"
              placeholder="cm"
              value={surveyData.height}
              onChange={handleInputChange}
              className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
            />
          </div>
        );
      case '체중':
        return (
          <div ref={stepRefs.current[3]} className="mb-4">
            <label className="block text-sm mb-2 font-medium text-gray-700">체중</label>
            <input
              type="text"
              name="weight"
              placeholder="kg"
              value={surveyData.weight}
              onChange={handleInputChange}
              className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
            />
          </div>
        );
      case '식단 목적':
        return (
          <div ref={stepRefs.current[4]} className="mb-4">
            <p className="text-lg mb-4 font-medium text-gray-700">식단을 통해 이루고자 하는 목표를 입력해주세요</p>
            <div className="grid grid-cols-1 gap-2">
              {(['체중 감량', '체중 유지', '건강 식습관', '체중 증량'] as DietGoal[]).map((goal) => (
                <button
                  key={goal}
                  onClick={() => handleDietGoalSelect(goal)}
                  className={`py-2 px-4 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 ${
                    surveyData.purpose === goal ? 'bg-red-100' : ''
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 mb-4 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">{steps[currentStepIndex]}</h1>
      <div className="mb-8 bg-gray-200 rounded-full h-2">
        <div
          className="bg-red-400 h-2 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
        ></div>
      </div>

      {renderStep()}

      <div className="mt-8 flex justify-between">
        {currentStepIndex > 0 && (
          <Button
            onClick={preStep}
            className="py-3 px-6 text-lg text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
          >
            이전
          </Button>
        )}
        {currentStepIndex < steps.length - 1 ? (
          <Button
            onClick={nextStep}
            disabled={!isStepValid()}
            className="py-3 px-6 text-lg bg-red-400 text-white rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            다음
          </Button>
        ) : (
          <Button
            onClick={saveDataToSupabase}
            disabled={!isStepValid()}
            className="py-3 px-6 text-lg bg-red-400 text-white rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            결과보기
          </Button>
        )}
      </div>
    </div>
  );
};

export default InfoResearch;
