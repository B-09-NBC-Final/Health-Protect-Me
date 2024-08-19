import React, { useState, useEffect } from 'react';
import Button from '@/components/Common/Button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';

type ProfileFormProps = {
  nickname: string;
  setNickname: (value: string) => void;
  height: string;
  setHeight: (value: string) => void;
  weight: string;
  setWeight: (value: string) => void;
  goal: string;
  setGoal: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

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
  onCancel
}: ProfileFormProps): React.ReactElement => {
  const [isValid, setIsValid] = useState(false);
  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [initialValues, setInitialValues] = useState({ weight, goal });
  const router = useRouter();

  const getButtonClasses = (currentGoal: string) => {
    return currentGoal === goal
      ? 'flex w-32 h-12 py-3 px-4 justify-center items-center gap-2 rounded-lg border border-[#F5637C] bg-[#FFF6F2] text-[#404145] font-semibold'
      : 'flex w-32 h-12 py-3 px-4 justify-center items-center gap-2 rounded-lg border border-[#B7B9BD] bg-white text-[#404145]';
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    if (value.length < 2 || value.length > 10) {
      setNicknameError('닉네임은 2글자 이상 10글자 이하 입니다.');
    } else {
      setNicknameError('');
    }
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

  const getInputBorderColor = (value: string, error: string) => {
    if (error) return 'border-red-500';
    if (value && !error) return 'border-[#49BA43]';
    return 'border-gray300';
  };

  const handleSave = () => {
    const updatedData = { weight, goal };
    if (weight !== initialValues.weight || goal !== initialValues.goal) {
      setShowAlert(true);
    } else {
      saveData(updatedData);
    }
  };

  const saveData = (data: { weight: string; goal: string }) => {
    onSave();
    setInitialValues(data);
  };

  const handleAlertConfirm = () => {
    setShowAlert(false);
    const updatedData = { weight, goal };
    saveData(updatedData);
  };

  const handleAlertCancel = () => {
    setShowAlert(false);
    router.push('/profile');
  };

  useEffect(() => {
    const isWeightValid = weight !== '' && !weightError;
    const isGoalValid = goal !== '';

    setIsValid(isWeightValid && isGoalValid);
  }, [weight, weightError, goal]);

  return (
    <>
      <form className="w-full max-w-[400px] px-4 s:px-0 mb-20 s:mb-0" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-6 s:mb-4">
          <label className="block text-left mb-1 s:text-sm s:font-normal" htmlFor="nickname">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            placeholder="닉네임 (2-9글자)"
            className={`border ${getInputBorderColor(
              nickname,
              nicknameError
            )} border-solid p-3 rounded-sm w-full text-gray900 placeholder:text-gray500 hover:border-gray600 focus:outline-none focus:border-secondary600`}
            value={nickname}
            onChange={(e) => handleNicknameChange(e.target.value)}
          />
          {nicknameError && <p className="flex text-red-500 text-sm mt-1">{nicknameError}</p>}
        </div>
        <div className="mb-6 s:mb-4">
          <label className="block text-left mb-1 s:text-sm s:font-normal " htmlFor="height">
            신장
          </label>
          <input
            type="text"
            id="height"
            placeholder="키 (100-299 cm)"
            className={`border ${getInputBorderColor(
              height,
              heightError
            )} border-solid p-3 rounded-sm w-full text-gray900 placeholder:text-gray500 hover:border-gray600 focus:outline-none focus:border-secondary600`}
            value={height}
            onChange={(e) => handleHeightChange(e.target.value)}
          />
          {heightError && <p className="flex text-red-500 text-sm mt-1">{heightError}</p>}
        </div>
        <div className="mb-6 s:mb-6">
          <label className="block text-left mb-1 s:text-sm s:font-normal" htmlFor="weight">
            체중
          </label>
          <input
            type="text"
            id="weight"
            placeholder="체중 (10-199 kg)"
            className={`border ${getInputBorderColor(
              weight,
              weightError
            )} border-solid p-3 rounded-sm w-full text-gray900 placeholder:text-gray500 hover:border-gray600 focus:outline-none focus:border-secondary600`}
            value={weight}
            onChange={(e) => handleWeightChange(e.target.value)}
          />
          {weightError && <p className="flex text-red-500 text-sm mt-1">{weightError}</p>}
        </div>
        <div className="mb-4 ">
          <label className="block text-left mb-1 s:text-sm s:font-normal">나의 식단 목표</label>
          <div className="flex justify-center space-x-2 s:mb-10">
            <button
              type="button"
              className={`${getButtonClasses('체중 감량')} s:py-3 s:px-4 s:h-16 `}
              onClick={() => setGoal('체중 감량')}
            >
              체중 감량
            </button>
            <button
              type="button"
              className={`${getButtonClasses('체중 유지')} s:py-3 s:px-4 s:h-16`}
              onClick={() => setGoal('체중 유지')}
            >
              체중 유지
            </button>
            <button
              type="button"
              className={`${getButtonClasses('체중 증가')} s:py-3 s:px-4 s:h-16`}
              onClick={() => setGoal('체중 증가')}
            >
              체중 증가
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-10 s:mt-8 gap-4">
          <Button
            buttonName="취소"
            bgColor="bg-white"
            textColor="text-[#27282A]"
            paddingY="py-2 s:py-2 px-3 s:px-3"
            buttonWidth="w-full s:w-[152px] "
            boxShadow="shadow-none"
            border="border-solid-[#B7B9BD]"
            hover="hover:bg-[#FAFAFA] hover:text-[#27282A] border border-solid-[#B7B9BD]"
            onClick={onCancel}
          />
          <Button
            buttonName="저장"
            bgColor={isValid ? 'bg-[#FF7A85]' : 'bg-gray-300'}
            textColor="text-white"
            paddingY="py-2 s:py-2 px-3 s:px-3"
            buttonWidth="w-full s:w-[152px]"
            boxShadow="shadow-none"
            onClick={isValid ? handleSave : undefined}
            hover={isValid ? 'hover:bg-[#F5637C] hover:text-white' : ''}
          />
        </div>
      </form>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>정보 변경 확인</AlertDialogTitle>
            <AlertDialogDescription>정보가 변경되었습니다. 새로운 정보를 받아보시겠습니까?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleAlertCancel}>아니오</AlertDialogCancel>
            <AlertDialogAction className="bg-[#F5637C]" onClick={handleAlertConfirm}>
              예
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProfileForm;
