import Image, { StaticImageData } from 'next/image';
import Defaultimg from '@/assets/image/defaultimg.png';
import { useUserStore } from '@/store/userStore';
type UserProfileProps = {
  src: string | StaticImageData;
  width: number;
  height: number;
};

const UserProfile = ({ width, height }: UserProfileProps): JSX.Element => {
  const { user } = useUserStore((state) => state);
  return (
    <div className={`border rounded-full overflow-auto`}>
      <Image
        src={user?.profile_url && user.profile_url.length > 0 ? user.profile_url : Defaultimg}
        width={width}
        height={height}
        alt="유저프로필"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default UserProfile;
