'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client'; // supabase 클라이언트 가져오기

const calculateBMI = (height: number, weight: number) => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

const getBMIStatus = (bmi: number) => {
  if (bmi < 18.5) return '저체중';
  if (bmi >= 18.5 && bmi < 23) return '정상';
  if (bmi >= 23 && bmi < 25) return '과체중';
  if (bmi >= 25 && bmi < 30) return '비만';
  return '고도비만';
};

const ProfileSection = () => {
  const supabase = createClient(); // supabase 클라이언트 생성
  const [userData, setUserData] = useState({
    height: 0,
    weight: 0,
    goal: '',
    nickname: '',
    profileImage: ''
  });
  const [bmiStatus, setBmiStatus] = useState('');
  const router = useRouter();

  // 사용자 인증 확인 함수
  const getUser = async () => {
    const session = await supabase.auth.getSession();
    const isSignIn = !!session.data.session;
    console.log(isSignIn);
    if (!isSignIn) {
      router.push('/login'); // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    }
  };

  useEffect(() => {
    getUser(); // 컴포넌트가 마운트될 때 사용자 인증 확인
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user');
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        const data = await response.json();
        setUserData({
          height: data.height,
          weight: data.weight,
          goal: data.goal,
          nickname: data.nickname,
          profileImage: data.profileImage
        });
        const bmi = calculateBMI(data.height, data.weight);
        setBmiStatus(getBMIStatus(bmi));
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData(); // 사용자 데이터 가져오기
  }, [router]);

  const handleNavigateToEdit = () => {
    router.push('/profile-edit');
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col items-center text-center mb-8">
        <div
          className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
          onClick={() => {}}
        >
          <img
            className="w-full h-full rounded-full"
            src={userData.profileImage || '/path/to/default-profile-image.jpg'}
            alt="Profile"
          />
        </div>
        <h1 className="text-xl font-bold mt-5">{userData.nickname || '사용자'}</h1>
        <button
          className="w-[88px] h-[28px] bg-gray-200 text-gray-500 text-xs rounded mt-2"
          onClick={handleNavigateToEdit}
        >
          프로필 수정
        </button>
      </div>
      <div className="w-full flex justify-center my-8">
        <hr className="border-t border-gray-300 w-80" />
      </div>
      <section className="w-[320px] h-[184px] mx-auto p-5 rounded-xl text-center bg-white border border-gray-300">
        <div className="w-[224px] bg-green-50 p-2 rounded-3xl mb-2 mx-auto">
          <h2 className="text-green-600 font-bold">{userData.goal}</h2>
        </div>
        <p className="text-gray-500 mb-4 text-sm">헬프미와 함께 목표를 달성</p>
        <div className="flex justify-between items-center p-4 rounded-lg">
          <div className="flex flex-col items-center">
            <span>키</span>
            <span>{userData.height}cm</span>
          </div>
          <div className="h-12 w-px bg-gray-300 mx-4"></div>
          <div className="flex flex-col items-center">
            <span>체중</span>
            <span>{userData.weight}kg</span>
          </div>
          <div className="h-12 w-px bg-gray-300 mx-4"></div>
          <div className="flex flex-col items-center">
            <span>BMI</span>
            <span>{bmiStatus}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileSection;
