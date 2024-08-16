import React from 'react';
import Image from 'next/image';
import defaultimg from '@/assets/image/defaultimg.png';

interface ProfileImageProps {
  profile_url?: string;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImage = ({ profile_url, onImageUpload }: ProfileImageProps): JSX.Element => {
  return (
    <div className="flex items-center mb-10">
      <div className="h-24 w-24 rounded-full object-cover overflow-hidden bg-gray-300 flex items-center justify-center relative mr-6">
        <Image
          className="rounded-full cursor-pointer"
          src={profile_url || defaultimg}
          alt="Profile"
          width={96}
          height={96}
          onClick={() => document.getElementById('fileInput')?.click()}
        />
        <input type="file" accept="image/*" id="fileInput" className="hidden" onChange={onImageUpload} />
      </div>
      <div className="flex flex-col items-start">
        <div className="mb-1">프로필 사진</div>
        <div className="text-sm text-[#76797F]">5MB 이하의 PNG, JPG 파일을 올려주세요.</div>
      </div>
    </div>
  );
};

export default ProfileImage;
