import Profile from '@/components/MyPage/ProfilePage/Profile';
import PostsSection from '@/components/MyPage/ProfilePage/PostsSection';

const MyPage = () => {
  return (
    <main className="min-h-screen bg-white text-black p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <Profile />
        </div>
        <div className="hidden md:block md:w-px bg-gray-300 mx-6"></div>
        <div className="md:w-2/3">
          <PostsSection />
        </div>
      </div>
    </main>
  );
};

export default MyPage;
