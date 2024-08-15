import React from 'react';
import ProfileImg from '@/components/Common/ProfileImg';
import Defaultimg from '@/assets/image/defaultimg.png';
import { useUserStore } from '@/store/userStore';

const ProfileTrigger = ({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { user } = useUserStore((state) => state);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };
  return (
    <div onClick={handleClick} className="border rounded-full overflow-hidden cursor-pointer ">
      <ProfileImg
        src={user?.profile_url && user.profile_url.length > 0 ? user.profile_url : Defaultimg}
        width={40}
        height={40}
      />
    </div>
  );
};

export default ProfileTrigger;
