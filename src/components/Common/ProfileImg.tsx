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
  console.log('user.profile_url', user?.profile_url);
  return (
    <div className={`border rounded-full overflow-hidden`}>
      <Image
        src={user?.profile_url && user.profile_url.length > 0 ? user.profile_url : Defaultimg}
        width={width}
        height={height}
        alt="유저프로필"
        className="w-10 h-10 object-cover flex s:items-center"
      />
    </div>
  );
};

export default UserProfile;
