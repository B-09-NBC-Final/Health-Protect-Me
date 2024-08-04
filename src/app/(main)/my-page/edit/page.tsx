'use client';

import ProfileEdit from '@/components/MyPage/profileEdit/ProfileEdit';
import React from 'react';

const EditPage = () => {
  const currentUserData = {
    currentHeight: 0,
    currentWeight: 0,
    currentGoal: '',
    currentNickname: '',
    currentProfileImage: '/'
  };

  const handleSave = async (height: number, weight: number, goal: string, nickname: string, profileImage: string) => {
  };

  const handleCancel = () => {
  };

  return (
    <div>
      <ProfileEdit {...currentUserData} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default EditPage;
