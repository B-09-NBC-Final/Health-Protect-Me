import React from 'react';
import Image from 'next/image';
import defaultimg from '@/assets/image/defaultimg.png';

type ProfileImageProps = {
  profileImage: string;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ profileImage, onImageUpload }) => {
  return (
    <div className="flex justify-between items-center w-full mb-10">
      <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center relative">
        <Image
          className="rounded-full cursor-pointer"
          src={profileImage || defaultimg}
          alt="Profile"
          width={120}
          height={120}
          onClick={() => document.getElementById('fileInput')?.click()}
        />
        <input type="file" accept="image/*" id="fileInput" className="hidden" onChange={onImageUpload} />
      </div>
      <div className="flex flex-col text-left">
        <div className="w-[272px] mb-1">프로필 사진</div>
        <div className="w-[272px] text-sm text-[#76797F]">5MB 이하의 PNG, JPG 파일을 올려주세요.</div>
      </div>
    </div>
  );
};

export default ProfileImage;
