import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface BMIInfoTooltipProps {
  bmi?: number | null;
}

const BMIInfo: React.FC<BMIInfoTooltipProps> = ({ bmi }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getBMICategory = (bmiValue: number | null | undefined): string => {
    if (bmiValue === null || bmiValue === undefined || !isFinite(bmiValue) || bmiValue < 0) {
      return '유효하지 않은 BMI';
    }
    if (bmiValue < 18.5) return '저체중';
    if (bmiValue < 23) return '정상';
    if (bmiValue < 25) return '과체중';
    return '비만';
  };

  const category = getBMICategory(bmi);

  return (
    <div className="relative inline-block">
      <div
        className="flex items-center space-x-1 cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <span className="font-bold text-sm text-[#27282A]">BMI</span>
        <Info size={16} className="w-3 h-3 s:w-4 s:h-4" />
      </div>
      {showTooltip && (
        <div className="absolute z-10 w-56 s:w-52 p-3 s:p-4 bg-gray-900 rounded-lg shadow-lg -left-24 s:-left-[100px] mt-2 text-xs s:text-sm">
          <div className="relative">
            <div className="absolute -top-5 left-[62%] s:left-[68%] transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-900"></div>
          </div>
          <h3 className="text-white font-semibold mb-2">BMI가 무엇인가요?</h3>
          <p className="text-gray-300 text-xs s:text-xs mb-3 s:mb-4">
            체질량지수(BMI)는 체중(kg)을 키(m)의 제곱으로 나눈 값이에요.
          </p>
          <div className="grid grid-cols-4 gap-1 text-[10px] s:text-xs text-white">
            <div className="bg-blue-500 p-0.5 sm:p-1 rounded text-center">
              저체중
              <br />
              18.5 미만
            </div>
            <div className="bg-green-500 p-0.5 s:p-1 rounded text-center">
              정상
              <br />
              18.5 - 22.9
            </div>
            <div className="bg-orange-500 p-0.5 s:p-1 rounded text-center">
              과체중
              <br />
              23 - 24.9
            </div>
            <div className="bg-red-500 p-0.5 s:p-1 rounded text-center">
              비만
              <br />
              25 이상
            </div>
          </div>
        </div>
      )}
      <div className="text-sm text-[#404145]">{category}</div>
    </div>
  );
};

export default BMIInfo;
