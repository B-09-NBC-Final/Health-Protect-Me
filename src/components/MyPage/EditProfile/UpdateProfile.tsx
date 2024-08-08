'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/components/Common/Button';
import Modal from './Modal/EditModal';
import ProfileImage from './Form/ProfileImg';
import ProfileForm from './Form/EditProfileForm';
import { useUserStore } from '@/store/userStore';
import LoadingPage from '@/components/LoadingPage/Loading';

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

const UpdateProfile = (): JSX.Element => {
  const supabase = createClient();
  const router = useRouter();
  const { user, setUser, clearUser } = useUserStore();
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [imageFile, setImageFile] = React.useState<File | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async (): Promise<void> => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user.id;

    if (!userId) {
      router.push('/login');
      return;
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('nickname, profile_url')
      .eq('user_id', userId)
      .single();

    const { data: infoData, error: infoError } = await supabase
      .from('information')
      .select('height, weight, purpose')
      .eq('user_id', userId)
      .single();

    if (userError || infoError) {
      console.error('Error fetching user data:', userError || infoError);
      return;
    }

    setUser({
      userId,
      nickname: userData.nickname,
      profileImage: userData.profile_url,
      height: infoData.height,
      weight: infoData.weight,
      goal: infoData.purpose
    });
  };

  const handleSave = async (): Promise<void> => {
    try {
      if (!user || !user.userId) {
        throw new Error('사용자 ID를 찾을 수 없습니다.');
      }

      let avatarUrl = user.profileImage;

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
        .update({ nickname: user.nickname, profile_url: avatarUrl })
        .eq('user_id', user.userId);

      if (userUpdateError) {
        throw new Error(userUpdateError.message);
      }

      const { error: infoUpdateError } = await supabase
        .from('information')
        .update({ height: user.height, weight: user.weight, purpose: user.goal })
        .eq('user_id', user.userId);

      if (infoUpdateError) {
        throw new Error(infoUpdateError.message);
      }

      setUser({ profileImage: avatarUrl });
      router.push('/my-page');
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };

  const handleCancel = (): void => {
    router.push('/my-page');
  };

  const handleDeleteAccount = async (): Promise<void> => {
    try {
      await deleteUser();
      clearUser();
      router.replace('/');
    } catch (error) {
      console.error('Failed to delete user account:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const openDeleteModal = (): void => {
    setShowModal(true);
  };

  const closeDeleteModal = (): void => {
    setShowModal(false);
  };

  if (!user)
    return (
      <div>
        <LoadingPage />
      </div>
    );

  return (
    <section className="w-[1360px] max-w-md mx-auto">
      <h1 className="w-[400px] h-8 mb-4 mx-4 text-2xl font-bold">프로필 수정</h1>
      <div className="flex flex-col items-center text-center mb-8 w-full px-4">
        <ProfileImage profileImage={user.profileImage || ''} onImageUpload={handleImageUpload} />
        <ProfileForm
          nickname={user.nickname || ''}
          setNickname={(nickname: string) => setUser({ nickname })}
          height={user.height ? user.height.toString() : ''}
          setHeight={(height: string) => setUser({ height: parseFloat(height) || null })}
          weight={user.weight ? user.weight.toString() : ''}
          setWeight={(weight: string) => setUser({ weight: parseFloat(weight) || null })}
          goal={user.goal || ''}
          setGoal={(goal: string) => setUser({ goal })}
          onSave={handleSave}
          onCancel={handleCancel}
        />
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

export default UpdateProfile;
