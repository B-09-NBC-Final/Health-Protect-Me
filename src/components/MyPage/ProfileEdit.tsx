'use client';

import React, { useState } from 'react';

type ProfileEditProps = {
  currentHeight: number;
  currentWeight: number;
  currentGoal: string;
  currentNickname: string;
  currentProfileImage: string;
  onCancel: () => void;
  onSave: (height: number, weight: number, goal: string, nickname: string, profileImage: string) => void;
};

const ProfileEdit = ({
  currentHeight,
  currentWeight,
  currentGoal,
  currentNickname,
  currentProfileImage,
  onCancel,
  onSave
}: ProfileEditProps) => {
  const [nickname, setNickname] = useState<string>(currentNickname);
  const [height, setHeight] = useState<number>(currentHeight);
  const [weight, setWeight] = useState<number>(currentWeight);
  const [goal, setGoal] = useState<string>(currentGoal);
  const [profileImage, setProfileImage] = useState<string>(currentProfileImage);

  const handleSave = () => {
    if (typeof onSave === 'function') {
      onSave(height, weight, goal, nickname, profileImage);
    } else {
      console.error('onSave is not a function');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="w-full max-w-md mx-auto">
      <h1 className="text-2xl m-5 text-center">프로필 수정</h1>
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4">
          <img
            className="w-full h-full rounded-full cursor-pointer"
            src={profileImage || '/path/to/default-profile-image.jpg'}
            alt="Profile"
            onClick={() => document.getElementById('fileInput')?.click()}
          />
          <input type="file" accept="image/*" id="fileInput" className="hidden" onChange={handleImageUpload} />
        </div>
        <form className="w-full">
          <div className="mb-4">
            <label className="block text-left" htmlFor="nickname">
              닉네임
            </label>
            <input
              id="nickname"
              className="border rounded p-2 w-full"
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-left" htmlFor="height">
              키
            </label>
            <input
              id="height"
              className="border rounded p-2 w-full"
              type="number"
              placeholder="키"
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <label className="block text-left" htmlFor="weight">
              체중
            </label>
            <input
              id="weight"
              className="border rounded p-2 w-full"
              type="number"
              placeholder="체중"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <label className="block text-left">목표</label>
            <div className="flex justify-between mb-4">
              <button
                type="button"
                className={`p-2 rounded w-1/3 ${goal === '체중 감량' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                onClick={() => setGoal('체중 감량')}
              >
                체중 감량
              </button>
              <button
                type="button"
                className={`p-2 rounded w-1/3 ${goal === '체중 증량' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                onClick={() => setGoal('체중 증량')}
              >
                체중 증량
              </button>
              <button
                type="button"
                className={`p-2 rounded w-1/3 ${goal === '건강한 식사' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                onClick={() => setGoal('건강한 식사')}
              >
                건강한 식사
              </button>
            </div>
          </div>
        </form>
        <div className="flex justify-between">
          <button className="bg-gray-300 p-2 rounded w-1/3" onClick={onCancel}>
            취소
          </button>
          <button className="bg-gray-800 text-white p-2 rounded w-1/3" onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileEdit;
