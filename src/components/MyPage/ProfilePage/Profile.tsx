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
    <div className="w-[400px] h-[472px] p-6 px-10 rounded-2xl border border-gray-300 flex flex-col items-center bg-white">
      <div className="w-[120px] h-[120px] rounded-full object-cover flex items-center justify-center mb-4">
        <Image
          className="rounded-full object-cover"
          src={user.profile_url || DEFAULT_PROFILE_IMAGE}
          alt="Profile"
          width={'120'}
          height={'120'}
        />
      </div>
      <h1 className="text-sm font-bold mb-6 text-center">{user.nickname || '사용자'}</h1>
      <div className="py-4 px-10 text-center w-80 h-[164px] shadow-my-box rounded-2xl flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-60 h-10 bg-[#EAF3EC] text-[#257D1D] rounded-xl mb-2 font-semibold">
          <h2 className="text-lg font-medium py-2">{user.goal}</h2>
        </div>
        <p className="text-gray-500 text-sm mt-2">헬프미와 함께 나의 목표를 달성해요</p>
        <div className="flex justify-between items-center mt-6 w-full">
          <div className="flex flex-col items-center">
            <span className="font-bold">키</span>
            <span className="text-sm text-gray800">{user.height ? `${user.height}cm` : 'N/A'}</span>
          </div>
          <div className="h-12 w-px bg-gray-300 mx-4"></div>
          <div className="flex flex-col items-center">
            <span className="font-bold">체중</span>
            <span className="text-sm text-gray800">{user.weight ? `${user.weight}kg` : 'N/A'}</span>
          </div>
          <div className="h-12 w-px bg-gray-300 mx-4"></div>
          <div className="flex flex-col items-center">
            <BMIInfo bmi={calculateBMI(user.height, user.weight)} />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <Button
          buttonName="프로필 수정하기"
          onClick={handleNavigateToEdit}
          bgColor="bg-white"
          boxShadow="none"
          textColor="text-gray900"
          paddingY="py-2"
          border="border-gray400"
          buttonWidth="w-[320px]"
          hover="hover:bg-gray100 hover:border-gray600"
        ></Button>
      </div>
    </div>
  );
};

export default Profile;
