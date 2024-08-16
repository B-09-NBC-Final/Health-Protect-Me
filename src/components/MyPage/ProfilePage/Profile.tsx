'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/supabase/client';
import { useUserStore } from '@/store/userStore';
import Button from '@/components/Common/Button';
import defaultimg from '@/assets/image/defaultimg.png';
import BMIInfo from '../EditProfile/BmiInfo';

const DEFAULT_PROFILE_IMAGE = defaultimg;

const calculateBMI = (height: number | null, weight: number | null): number | null => {
  if (height === null || weight === null) return null;
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

const getBMIStatus = (bmi: number | null): string => {
  if (bmi === null) return '정보 없음';
  if (bmi < 18.5) return '저체중';
  if (bmi >= 18.5 && bmi < 23) return '정상';
  if (bmi >= 23 && bmi < 25) return '과체중';
  if (bmi >= 25 && bmi < 30) return '비만';
  return '고도비만';
};

const Profile = () => {
  const supabase = createClient();
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const [buttonClicked, setButtonClicked] = useState(false);

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
        .eq('user_id', userId)
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

      const data = {
        userId,
        height: userInfo.height,
        weight: userInfo.weight,
        goal: userInfo.purpose,
        nickname: userProfile.nickname,
        profileImage: userProfile.profile_url || DEFAULT_PROFILE_IMAGE.src
      };

      setUser(data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      router.push('/login');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleNavigateToEdit = (): void => {
    setButtonClicked(true);
    const { height, weight, goal, nickname, profile_url } = user || {};
    router.push(
      `/my-page/edit?height=${height || ''}&weight=${
        weight || ''
      }&goal=${goal}&nickname=${nickname}&profileImage=${encodeURIComponent(profile_url || '')}`
    );
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const bmi = calculateBMI(user.height, user.weight);
  const bmiStatus = getBMIStatus(bmi);

  return (
    <div className="w-[400px] h-[472px] p-6 px-10 s:px-6 rounded-2xl border border-gray-300 flex flex-col items-center bg-white">
      <div className="w-[120px] h-[120px] overflow-auto rounded-full object-cover flex items-center justify-center mb-4">
        <Image
          className="rounded-full object-cover"
          src={user.profile_url || DEFAULT_PROFILE_IMAGE}
          alt="Profile"
          width={80}
          height={80}
        />
      </div>
      <h1 className="text-sm font-bold mb-4 text-center">{user.nickname || '사용자'}</h1>
      <div className="py-3 s:py-4 px-4 s:px-4 text-center w-full shadow-my-box rounded-2xl flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-full h-8 bg-[#EAF3EC] text-[#257D1D] rounded-xl mb-2 font-semibold">
          <h2 className="text-base font-medium py-1">{user.goal}</h2>
        </div>
        <p className="text-gray-500 text-xs mt-1">헬프미와 함께 나의 목표를 달성해요</p>
        <div className="flex justify-between items-center mt-4 s:mt-6 w-full">
          <div className="flex flex-col items-center">
            <span className="font-bold text-sm">키</span>
            <span className="text-xs text-gray-800">{user.height ? `${user.height}cm` : 'N/A'}</span>
          </div>
          <div className="h-8 w-px bg-gray-300 mx-2"></div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-sm">체중</span>
            <span className="text-xs text-gray-800">{user.weight ? `${user.weight}kg` : 'N/A'}</span>
          </div>
          <div className="h-8 w-px bg-gray-300 mx-2"></div>
          <div className="flex flex-col items-center">
            <BMIInfo bmi={calculateBMI(user.height, user.weight)} />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6 s:mt-0 w-full">
        <Button
          buttonName="프로필 수정하기"
          onClick={handleNavigateToEdit}
          bgColor="bg-white"
          boxShadow="none"
          textColor="text-gray-900"
          marginX='mt-6'
          paddingY="py-2"
          border="border-gray-400"
          buttonWidth="w-full"
          hover="hover:bg-gray-100 hover:border-gray-600"
        />
      </div>
    </div>
  );
};
export default Profile;
