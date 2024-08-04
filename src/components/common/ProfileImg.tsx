import Image, { StaticImageData } from 'next/image';
import Defaultimg from '@/assets/image/defaultimg.png';
type UserProfileProps = {
  src: string | StaticImageData;
  width: number;
  height: number;
};

const UserProfile: React.FC<UserProfileProps> = ({ src, width, height }) => {
  return (
    <div className={`border rounded-full overflow-auto`}>
      <Image
        src={src! || Defaultimg}
        width={width}
        height={height}
        alt="유저프로필"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default UserProfile;
