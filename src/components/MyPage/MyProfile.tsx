import Profile from '@/components/MyPage/ProfilePage/Profile';
import PostsSection from '@/components/MyPage/ProfilePage/PostsSection';

const MyProfile = () => {
  return (
    <div className="h-[858px] justify-between">
      <div className="max-w-full flex flex-col md:flex-row">
        <div className="flex items-start mr-10">
          <Profile />
        </div>
        <div className=" items-end ml-10">
          <PostsSection />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
