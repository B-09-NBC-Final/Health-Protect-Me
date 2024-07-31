'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/components/common/Button';

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
  const supabase = createClient();
  const [nickname, setNickname] = useState<string>(currentNickname);
  const [height, setHeight] = useState<number>(currentHeight);
  const [weight, setWeight] = useState<number>(currentWeight);
  const [goal, setGoal] = useState<string>(currentGoal);
  const [profileImage, setProfileImage] = useState<string>(currentProfileImage);
  const [imageFile, setImageFile] = useState<null | File>(null);
  const router = useRouter();

  const handleSave = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session.user.id;

      let avatarUrl = profileImage;

      if (imageFile) {
        const { data: avatarData, error } = await supabase.storage
          .from('avatars')
          .upload(`public/${uuidv4()}.png`, imageFile);
        if (error) {
          throw new Error(`Error uploading file: ${error.message}`);
        }
        const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(avatarData.path);
        avatarUrl = publicUrlData.publicUrl;
      }

      const { error: userUpdateError } = await supabase
        .from('users')
        .update({ nickname, profile_url: avatarUrl })
        .eq('user_id', userId);

      if (userUpdateError) {
        throw new Error(userUpdateError.message);
      }

      const { error: infoUpdateError } = await supabase
        .from('information')
        .update({ height, weight, purpose: goal })
        .eq('user_id', userId);

      if (infoUpdateError) {
        throw new Error(infoUpdateError.message);
      }

      onSave(height, weight, goal, nickname, avatarUrl);
      router.push('/my-page');
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };

  const fetchUserData = async (): Promise<void> => {
    const { data: sessionData } = await supabase.auth.getSession();
    const isSignIn = !!sessionData.session;
    if (!isSignIn) {
      console.log('로그인 상태 아님');
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

      setNickname(userProfile.nickname);
      setHeight(userInfo.height);
      setWeight(userInfo.weight);
      setGoal(userInfo.purpose);
      setProfileImage(userProfile.profile_url || '/path/to/default-profile-image.jpg');
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      router.push('/login');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="w-[1360px] max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold m-5">프로필 수정</h1>
      <div className="flex flex-col items-center text-center mb-8 w-full px-4">
        <div className="flex justify-between items-center w-full mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center relative">
            <Image
              className="rounded-full cursor-pointer"
              src={profileImage || '/path/to/default-profile-image.jpg'}
              alt="Profile"
              width={120}
              height={120}
              onClick={() => document.getElementById('fileInput')?.click()}
            />
            <input type="file" accept="image/*" id="fileInput" className="hidden" onChange={handleImageUpload} />
          </div>
          <div className="flex flex-col text-left">
            <div className="font-semibold">프로필 사진</div>
            <div className="text-[#76797F]">5MB 이하의 PNG, JPG 파일을 올려주세요.</div>
          </div>
        </div>
        <form className="w-[400px] mb-10">
          <div className="mb-6">
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
          <div className="mb-6">
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
          <div className="mb-6">
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
            <label className="block text-left">나의 식단 목표</label>
            <div className="flex justify-center space-x-2">
              <Button
                buttonName="체중 감량"
                bgColor={goal === '체중 감량' ? 'bg-[#FFF6F2]' : 'bg-white'}
                textColor="text-[#404145]"
                buttonWidth="w-32 h-12"
                onClick={() => setGoal('체중 감량')}
              />
              <Button
                buttonName="체중 증량"
                bgColor={goal === '체중 증량' ? 'bg-[#FFF6F2]' : 'bg-white'}
                textColor="text-[#404145]"
                buttonWidth="w-32 h-12"
                onClick={() => setGoal('체중 증량')}
              />
              <Button
                buttonName="건강한 식사"
                bgColor={goal === '건강한 식사' ? 'bg-[#FFF6F2]' : 'bg-white'}
                textColor="text-[#404145]"
                buttonWidth="w-32 h-12"
                onClick={() => setGoal('건강한 식사')}
              />
            </div>
          </div>
        </form>
        <div className="flex justify-between mb-20 w-full">
          <Button
            buttonName="취소"
            bgColor="bg-white"
            textColor="text-[#27282A]"
            buttonWidth="w-48"
            onClick={() => {
              onCancel();
              router.push('/my-page');
            }}
          />
          <Button
            buttonName="저장"
            bgColor="bg-[#FF7A85]"
            textColor="text-white"
            buttonWidth="w-48"
            onClick={handleSave}
          />
        </div>
        <div>
          <Button
            buttonName="탈퇴하기"
            bgColor="bg-transparent"
            textColor="text-[#76797F] underline"
            buttonWidth="w-auto"
            onClick={() => console.log('탈퇴하기 클릭됨')}
          />
        </div>
      </div>
    </section>
  );
};

export default ProfileEdit;
