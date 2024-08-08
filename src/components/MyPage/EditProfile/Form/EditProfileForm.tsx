import React from 'react'
import Button from '@/components/Common/Button'

type ProfileFormProps = {
  nickname: string
  setNickname: (value: string) => void
  height: number
  setHeight: (value: number) => void
  weight: number
  setWeight: (value: number) => void
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
  const getButtonClasses = (currentGoal: string) => {
    return currentGoal === goal
      ? 'flex w-32 h-12 py-3 px-4 justify-center items-center gap-2 rounded-lg border border-[#F5637C] bg-[#FFF6F2] text-[#404145] font-semibold'
      : 'flex w-32 h-12 py-3 px-4 justify-center items-center gap-2 rounded-lg border border-[#B7B9BD] bg-white text-[#404145]'
  }

  return (
    <form className="w-[400px] mb-20" onSubmit={(e) => e.preventDefault()}>
      <div className="mb-6">
        <label className="block text-left mb-1" htmlFor="nickname">
          닉네임
        </label>
        <input
          type="text"
          id="nickname"
          placeholder="닉네임"
          className="border border-gray300 border-solid p-3 rounded-sm w-full text-gray900 placeholder:text-gray500 hover:border-gray600 focus:outline-none focus:border-secondary600"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-left mb-1" htmlFor="height">
          키
        </label>
        <input
          type="text"
          id="height"
          placeholder="키"
          className="border border-gray300 border-solid p-3 rounded-sm w-full text-gray900 placeholder:text-gray500 hover:border-gray600 focus:outline-none focus:border-secondary600"
          value={height}
          onChange={(e) => setHeight(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-6">
        <label className="block text-left mb-1" htmlFor="weight">
          체중
        </label>
        <input
          type="text"
          id="weight"
          placeholder="체중"
          className="border border-gray300 border-solid p-3 rounded-sm w-full text-gray900 placeholder:text-gray500 hover:border-gray600 focus:outline-none focus:border-secondary600"
          value={weight}
          onChange={(e) => setWeight(parseFloat(e.target.value))}
        />
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
          bgColor="bg-[#FF7A85]"
          textColor="text-white"
          buttonWidth="w-48"
          boxShadow="shadow-none"
          onClick={onSave}
          hover="hover:bg-[#F5637C] hover:text-white"
        />
      </div>
    </form>
  )
}

export default ProfileForm