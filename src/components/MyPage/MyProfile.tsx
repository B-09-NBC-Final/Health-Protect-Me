import Profile from '@/components/MyPage/ProfilePage/Profile';
import PostsSection from '@/components/MyPage/ProfilePage/PostsSection';

const MyProfile = () => {
  return (
    <main className="w-[1440px] h-[858px] flex justify-between bg-white p-10">
      <div className="max-w-full mx-10 flex flex-col md:flex-row">
        <div className="flex flex-col items-start mr-10">
          <Profile />
        </div>
        <div className="flex flex-col items-end ml-10">
          <PostsSection />
        </div>
      </div>
    </main>
  );
};

export default MyProfile;
