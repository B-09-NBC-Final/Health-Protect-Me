'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/components/Common/Button';

type ModalProps = {
  show: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const Modal = ({ show, title, description, onConfirm, onCancel }: ModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-2">{description}</p>
        <div className="flex justify-end mt-4">
          <button onClick={onCancel} className="mr-2">
            취소
          </button>
          <button onClick={onConfirm} className="bg-red-500 text-white p-2 rounded">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export const deleteUser = async () => {
  const supabase = createClient();
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user.id;

    if (!userId) {
      throw new Error('유저 아이디를 찾을 수 없습니다.');
    }

    const { data, error } = await supabase.rpc('delete_user', { user_id: userId });
    if (error) {
      console.error('Error', error.message);
      throw error;
    }

    await supabase.auth.signOut();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();

  // 프로필 저장 함수
  const handleSave = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;

      if (!userId) {
        throw new Error('사용자 ID를 찾을 수 없습니다.');
      }

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

      // 정보 업데이트 시 sync_user_data 필드도 false로 설정
      const { data: aa, error: infoUpdateError } = await supabase
        .from('information')
        .update({ weight, purpose: goal, sync_user_data: false })
        .eq('user_id', userId);

      if (infoUpdateError) {
        throw new Error(infoUpdateError.message);
      }

      router.push('/my-page');
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };


  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
      router.replace('/');
    } catch (error) {
      console.error('Failed to delete user account:', error);
    }
  };

  const fetchUserData = async (): Promise<void> => {
    const { data: sessionData } = await supabase.auth.getSession();
    const isSignIn = !!sessionData.session;
    if (!isSignIn) {
      router.push('/login');
      return;
    }

    const userId = sessionData.session?.user.id;
    if (!userId) {
      console.error('사용자 ID를 찾을 수 없습니다.');
      return;
    }

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

  const openDeleteModal = () => {
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
  };

  const getButtonClasses = (currentGoal: string) => {
    return currentGoal === goal
      ? 'flex w-32 h-12 py-3 px-4 justify-center items-center gap-2 rounded-lg border border-[#F5637C] bg-[#FFF6F2] text-[#404145] font-semibold'
      : 'flex w-32 h-12 py-3 px-4 justify-center items-center gap-2 rounded-lg border border-[#B7B9BD] bg-white text-[#404145]';
  };

  return (
    <section className="w-[1360px] max-w-md mx-auto">
      <h1 className="w-[400px] h-8 mb-4 mx-4 text-2xl font-bold">프로필 수정</h1>
      <div className="flex flex-col items-center text-center mb-8 w-full px-4">
        <div className="flex justify-between items-center w-full mb-10">
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
            <div className="w-[272px] mb-1">프로필 사진</div>
            <div className="w-[272px] text-sm text-[#76797F]">5MB 이하의 PNG, JPG 파일을 올려주세요.</div>
          </div>
        </div>
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
              boxShadow="shadow-none"
              onClick={handleSave}
              hover="hover:bg-[#F5637C] hover:text-white"
            />
          </div>
        </form>
        <div>
          <Button
            buttonName="탈퇴하기"
            bgColor="bg-transparent"
            textColor="text-[#76797F]"
            buttonWidth="w-[65px]"
            onClick={openDeleteModal}
            boxShadow="shadow-none"
            hover="hover:none"
          />
        </div>
      </div>
      <Modal
        show={showModal}
        title="계정 탈퇴"
        description="정말 탈퇴하시겠습니까?"
        onConfirm={handleDeleteAccount}
        onCancel={closeDeleteModal}
      />
    </section>
  );
};

export default ProfileEdit;
