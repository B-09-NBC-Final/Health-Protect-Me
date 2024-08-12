import React, { useState, useEffect } from 'react'
import Button from '@/components/Common/Button'

type ProfileFormProps = {
  nickname: string
  setNickname: (value: string) => void
  height: string
  setHeight: (value: string) => void
  weight: string
  setWeight: (value: string) => void
  goal: string
  setGoal: (value: string) => void
  onSave: () => void
  onCancel: () => void
}

const ProfileForm = ({
  nickname,
  setNickname,
  height,
  setHeight,
  weight,
  setWeight,
  goal,
  setGoal,
  onSave,
  onCancel,
}: ProfileFormProps): React.ReactElement => {
  const [isValid, setIsValid] = useState(false);
  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');

  const getButtonClasses = (currentGoal: string) => {
    return currentGoal === goal
      ? 'flex w-32 h-12 py-3 px-4 justify-center items-center gap-2 rounded-lg border border-[#F5637C] bg-[#FFF6F2] text-[#404145] font-semibold'
      : 'flex w-32 h-12 py-3 px-4 justify-center items-center gap-2 rounded-lg border border-[#B7B9BD] bg-white text-[#404145]'
  }

  const handleNicknameChange = (value: string) => {
    setNickname(value);
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);
    if (value === '') {
      setHeightError('');
    } else {
      const num = parseFloat(value);
      if (isNaN(num) || num < 100 || num >= 300) {
        setHeightError('키는 100cm 이상 300cm 미만이어야 합니다.');
      } else {
        setHeightError('');
      }
    }
  };

  const handleWeightChange = (value: string) => {
    setWeight(value);
    if (value === '') {
      setWeightError('');
    } else {
      const num = parseFloat(value);
      if (isNaN(num) || num < 10 || num >= 200) {
        setWeightError('체중은 10kg 이상 200kg 미만이어야 합니다.');
      } else {
        setWeightError('');
      }
    }
  };

  useEffect(() => {
    const isNicknameValid = nickname.length >= 2;
    const isHeightValid = height !== '' && !heightError;
    const isWeightValid = weight !== '' && !weightError;
    const isGoalValid = goal !== '';

    setIsValid(isNicknameValid && isHeightValid && isWeightValid && isGoalValid);
  }, [nickname, height, heightError, weight, weightError, goal]);

  return (
    <form className="w-[400px] mb-20" onSubmit={(e) => e.preventDefault()}>
      <div className="mb-6">
        <label className="block text-left mb-1" htmlFor="nickname">
          닉네임
        </label>
        <input
          type="text"
          id="nickname"
          placeholder="닉네임 (2글자 이상)"
          className="border border-gray300 border-solid p-3 rounded-sm w-full text-gray900 placeholder:text-gray500 hover:border-gray600 focus:outline-none focus:border-secondary600"
          value={nickname}
          onChange={(e) => handleNicknameChange(e.target.value)}
        />
        {nickname.length > 0 && nickname.length < 2 && (
          <p className="flex text-red-500 text-sm mt-1">닉네임은 2글자 이상이어야 합니다.</p>
        )}
      </div>
      <div className="mb-6">
        <label className="block text-left mb-1" htmlFor="height">
          키
        </label>
        <input
          type="text"
          id="height"
          placeholder="키 (100-299 cm)"
          className="border border-gray300 border-solid p-3 rounded-sm w-full text-gray900 placeholder:text-gray500 hover:border-gray600 focus:outline-none focus:border-secondary600"
          value={height}
          onChange={(e) => handleHeightChange(e.target.value)}
        />
        {heightError && <p className="flex text-red-500 text-sm mt-1">{heightError}</p>}
      </div>
      <div className="mb-6">
        <label className="block text-left mb-1" htmlFor="weight">
          체중
        </label>
        <input
          type="text"
          id="weight"
          placeholder="체중 (10-199 kg)"
          className="border border-gray300 border-solid p-3 rounded-sm w-full text-gray900 placeholder:text-gray500 hover:border-gray600 focus:outline-none focus:border-secondary600"
          value={weight}
          onChange={(e) => handleWeightChange(e.target.value)}
        />
        {weightError && <p className="flex text-red-500 text-sm mt-1">{weightError}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-left mb-1">나의 식단 목표</label>
        <div className="flex justify-center space-x-2">
          <button type="button" className={getButtonClasses('체중 감량')} onClick={() => setGoal('체중 감량')}>
            체중 감량
          </button>
          <button type="button" className={getButtonClasses('체중 유지')} onClick={() => setGoal('체중 유지')}>
            체중 유지
          </button>
          <button type="button" className={getButtonClasses('체중 증가')} onClick={() => setGoal('체중 증가')}>
            체중 증가
          </button>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Button
          buttonName="취소"
          bgColor="bg-white"
          textColor="text-[#27282A]"
          buttonWidth="w-48"
          boxShadow="shadow-none"
          border="border-solid-[#B7B9BD]"
          hover="hover:bg-[#FAFAFA] hover:text-[#27282A] border border-solid-[#B7B9BD]"
          onClick={onCancel}
        />
        <Button
          buttonName="저장"
          bgColor={isValid ? "bg-[#FF7A85]" : "bg-gray-300"}
          textColor="text-white"
          buttonWidth="w-48"
          boxShadow="shadow-none"
          onClick={isValid ? onSave : undefined}
          hover={isValid ? "hover:bg-[#F5637C] hover:text-white" : ""}
          
        />
      </div>
    </form>
  )
}

export default ProfileForm