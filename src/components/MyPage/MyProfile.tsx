import Profile from '@/components/MyPage/ProfilePage/Profile';
import PostsSection from '@/components/MyPage/ProfilePage/PostsSection';

const MyProfile = () => {
  return (
    <div className="h-[858px] s:h-full">
      <div className="  flex-col ">
        <div className="flex items-start mr-10 s:mr-0">
          <Profile />
        </div>
        <div className="items-end ml-10 s:ml-0 s:items-center">
          <PostsSection />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
