
import React from 'react';
import ProfileImg from '@/components/Common/ProfileImg';
import Defaultimg from '@/assets/image/defaultimg.png';
import { useUserStore } from '@/store/userStore';

const ProfileTrigger = ({ onClick }: { onClick: () => void }) => {
  const { user } = useUserStore((state) => state);
  return (
    <div onClick={onClick} className="border rounded-full overflow-hidden cursor-pointer">
      <ProfileImg
        src={user?.profile_url && user.profile_url.length > 0 ? user.profile_url : Defaultimg}
        width={40}
        height={40}
      />
    </div>
  );
};

export default ProfileTrigger;
