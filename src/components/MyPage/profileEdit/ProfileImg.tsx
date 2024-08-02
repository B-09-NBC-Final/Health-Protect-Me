import React from 'react';
import Image from 'next/image';

type ProfileImageUploadProps = {
  profileImage: string;
  onImageChange: (file: File) => void;
};

const ProfileImage = ({ profileImage, onImageChange }: ProfileImageUploadProps) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageChange(event.target.files[0]);
    }
  };

  return (
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
      </div>
    </div>
  );
};

export default ProfileImage;