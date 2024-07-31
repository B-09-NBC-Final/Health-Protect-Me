'use client';

import React from 'react';
import ProfileEdit from '@/components/MyPage/ProfileEdit';

const EditPage = () => {
  const currentUserData = {
    currentHeight: 0,
    currentWeight: 0,
    currentGoal: '',
    currentNickname: '',
    currentProfileImage: '/'
  };

  const handleSave = async (height: number, weight: number, goal: string, nickname: string, profileImage: string) => {
    console.log('Save', { height, weight, goal, nickname, profileImage });
  };

  const handleCancel = () => {
    console.log('Cancel');
  };

  return (
    <div>
      <ProfileEdit {...currentUserData} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default EditPage;
