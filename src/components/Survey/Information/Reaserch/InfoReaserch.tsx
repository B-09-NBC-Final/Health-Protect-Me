'use client';
import React, { useState, useRef, useEffect } from 'react';

const InfoResearch = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['출생년도', '성별', '신장', '체중', '식단 목적'];
  const stepRefs = useRef(steps.map(() => React.createRef()));

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  useEffect(() => {
    stepRefs.current[currentStep].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, [currentStep]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">설문조사 페이지</h1>

      <div className="mb-6 bg-gray-200 rounded-full">
        <div
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        >
          {Math.round((currentStep / (steps.length - 1)) * 100)}%
        </div>
      </div>

      <div ref={stepRefs.current[0]} className={`mb-4 ${currentStep !== 0 && 'hidden'}`}>
        <input
          type="text"
          placeholder="출생년도(19xx년)"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onBlur={nextStep}
        />
      </div>

      <div ref={stepRefs.current[1]} className={`mb-4 ${currentStep !== 1 && 'hidden'}`}>
        <p className="mb-2 font-medium text-gray-700">성별(Gender)</p>
        <div className="flex space-x-2">
          <button
            onClick={nextStep}
            className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            남(Male)
          </button>
          <button
            onClick={nextStep}
            className="flex-1 py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            여(Female)
          </button>
        </div>
      </div>

      <div ref={stepRefs.current[2]} className={`mb-4 ${currentStep !== 2 && 'hidden'}`}>
        <input
          type="text"
          placeholder="신장"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onBlur={nextStep}
        />
      </div>

      <div ref={stepRefs.current[3]} className={`mb-4 ${currentStep !== 3 && 'hidden'}`}>
        <input
          type="text"
          placeholder="체중"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onBlur={nextStep}
        />
      </div>

      <div ref={stepRefs.current[4]} className={`${currentStep !== 4 && 'hidden'}`}>
        <p className="mb-2 font-medium text-gray-700">식단 목적</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={nextStep}
            className="py-2 px-4 bg-black text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            체중 감량
          </button>
          <button
            onClick={nextStep}
            className="py-2 px-4 bg-black text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            체중 유지
          </button>
          <button
            onClick={nextStep}
            className="py-2 px-4 bg-black text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            건강 식습관
          </button>
          <button
            onClick={nextStep}
            className="py-2 px-4 bg-black text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            체중 증량
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoResearch;
