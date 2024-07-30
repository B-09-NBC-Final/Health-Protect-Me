'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client';

const DEFAULT_PROFILE_IMAGE = '/path/to/default-profile-image.jpg';

const calculateBMI = (height: number, weight: number): number => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

const getBMIStatus = (bmi: number): string => {
  if (bmi < 18.5) return '저체중';
  if (bmi >= 18.5 && bmi < 23) return '정상';
  if (bmi >= 23 && bmi < 25) return '과체중';
  if (bmi >= 25 && bmi < 30) return '비만';
  return '고도비만';
};

type UserData = {
  height: number | null;
  weight: number | null;
  goal: string;
  nickname: string;
  profileImage: string;
};

const ProfileSection = () => {
  const supabase = createClient();
  const [userData, setUserData] = useState<UserData>({
    height: null,
    weight: null,
    goal: '',
    nickname: '',
    profileImage: ''
  });
  const [bmiStatus, setBmiStatus] = useState<string>('');
  const router = useRouter();

  const fetchUserData = async (): Promise<void> => {
    const { data: sessionData } = await supabase.auth.getSession();
    const isSignIn = !!sessionData.session;
    if (!isSignIn) {
      router.push('/login');
      return;
    }

    const userId = sessionData.session.user.id;

    try {
      const { data: userProfile, error: userError } = await supabase
        .from('users')
        .select('nickname, profile_url')
        .eq('id', userId)
        .single();

      if (userError) {
        throw new Error(userError.message);
      }

      const { data: userInfo, error: infoError } = await supabase
        .from('information')
        .select('height, weight, purpose')
        .eq('user_id', userId)
        .single();

      if (infoError) {
        throw new Error(infoError.message);
      }

      const data: UserData = {
        height: userInfo.height,
        weight: userInfo.weight,
        goal: userInfo.purpose,
        nickname: userProfile.nickname,
        profileImage: userProfile.profile_url
      };

      setUserData(data);

      const bmi = calculateBMI(data.height, data.weight);
      setBmiStatus(getBMIStatus(bmi));
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      router.push('/login');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleNavigateToEdit = (): void => {
    const { height, weight, goal, nickname, profileImage } = userData;
    router.push(
      `/my-page/edit?height=${height}&weight=${weight}&goal=${goal}&nickname=${nickname}&profileImage=${encodeURIComponent(
        profileImage
      )}`
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto pt-4 pb-6 px-10 rounded-2xl border border-gray-300 flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer mb-4">
        <img
          className="w-full h-full rounded-full"
          src={userData.profileImage || DEFAULT_PROFILE_IMAGE}
          alt="Profile"
        />
      </div>
      <h1 className="text-sm font-bold mb-6 text-center">{userData.nickname || '사용자'}</h1>
      <div className="py-4 px-10 text-center w-[320px] bg-[#FAFAFA] shadow-md rounded-2xl flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-[240px] h-[40px] bg-[#EAF3EC] text-[#257D1D] rounded-2xl mb-2">
          <h2 className="text-sm font-bold">{userData.goal}</h2>
        </div>
        <p className="text-gray-500 text-sm mt-2">헬프미와 함께 목표를 달성</p>
        <div className="flex justify-between items-center mt-6 w-full">
          <div className="flex flex-col items-center">
            <span className="font-bold">키</span>
            <span>{userData.height ? `${userData.height}cm` : 'N/A'}</span>
          </div>
          <div className="h-12 w-px bg-gray-300 mx-4"></div>
          <div className="flex flex-col items-center">
            <span className="font-bold">체중</span>
            <span>{userData.weight ? `${userData.weight}kg` : 'N/A'}</span>
          </div>
          <div className="h-12 w-px bg-gray-300 mx-4"></div>
          <div className="flex flex-col items-center">
            <span className="font-bold">BMI</span>
            <span>{bmiStatus}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="w-[320px] h-[40px] text-sm font-bold border border-[#B7B9BD] rounded-xl"
          onClick={handleNavigateToEdit}
        >
          프로필 수정
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
