'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/supabase/client'
import { v4 as uuidv4 } from 'uuid'
import Button from '@/components/Common/Button'
import Modal from './Modal/EditModal'
import ProfileImage from './Form/ProfileImg'
import ProfileForm from './Form/EditProfileForm'

export const deleteUser = async () => {
  const supabase = createClient()
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user.id

    if (!userId) {
      throw new Error('유저 아이디를 찾을 수 없습니다.')
    }

    const { data, error } = await supabase.rpc('delete_user', { user_id: userId })
    if (error) {
      console.error('Error', error.message)
      throw error
    }

    await supabase.auth.signOut()
  } catch (error) {
    console.error(error)
    throw error
  }
}

const UpdateProfile = (): JSX.Element => {
  const supabase = createClient()
  const [nickname, setNickname] = useState<string>('')
  const [height, setHeight] = useState<number>(0)
  const [weight, setWeight] = useState<number>(0)
  const [goal, setGoal] = useState<string>('')
  const [profileImage, setProfileImage] = useState<string>('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async (): Promise<void> => {
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user.id

    if (!userId) {
      router.push('/login')
      return
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('nickname, profile_url')
      .eq('user_id', userId)
      .single()

    const { data: infoData, error: infoError } = await supabase
      .from('information')
      .select('height, weight, purpose')
      .eq('user_id', userId)
      .single()

    if (userError || infoError) {
      console.error('Error fetching user data:', userError || infoError)
      return
    }

    setNickname(userData.nickname)
    setProfileImage(userData.profile_url)
    setHeight(infoData.height)
    setWeight(infoData.weight)
    setGoal(infoData.purpose)
  }

  const handleSave = async (): Promise<void> => {
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const userId = sessionData.session?.user.id

      if (!userId) {
        throw new Error('사용자 ID를 찾을 수 없습니다.')
      }

      let avatarUrl = profileImage

      if (imageFile) {
        const { data: avatarData, error } = await supabase.storage
          .from('avatars')
          .upload(`public/${uuidv4()}.png`, imageFile)
        if (error) {
          throw new Error(`Error uploading file: ${error.message}`)
        }
        const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(avatarData.path)
        avatarUrl = publicUrlData.publicUrl
      }

      const { error: userUpdateError } = await supabase
        .from('users')
        .update({ nickname, profile_url: avatarUrl })
        .eq('user_id', userId)

      if (userUpdateError) {
        throw new Error(userUpdateError.message)
      }

      const { error: infoUpdateError } = await supabase
        .from('information')
        .update({ height, weight, purpose: goal })
        .eq('user_id', userId)

      if (infoUpdateError) {
        throw new Error(infoUpdateError.message)
      }

      router.push('/my-page')
    } catch (error) {
      console.error('Failed to save user data:', error)
    }
  }

  const handleCancel = (): void => {
    router.push('/my-page')
  }

  const handleDeleteAccount = async (): Promise<void> => {
    try {
      await deleteUser()
      router.replace('/')
    } catch (error) {
      console.error('Failed to delete user account:', error)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const openDeleteModal = (): void => {
    setShowModal(true)
  }

  const closeDeleteModal = (): void => {
    setShowModal(false)
  }

  return (
    <section className="w-[1360px] max-w-md mx-auto">
      <h1 className="w-[400px] h-8 mb-4 mx-4 text-2xl font-bold">프로필 수정</h1>
      <div className="flex flex-col items-center text-center mb-8 w-full px-4">
        <ProfileImage profileImage={profileImage} onImageUpload={handleImageUpload} />
        <ProfileForm
          nickname={nickname}
          setNickname={setNickname}
          height={height}
          setHeight={setHeight}
          weight={weight}
          setWeight={setWeight}
          goal={goal}
          setGoal={setGoal}
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
  )
}

export default UpdateProfile