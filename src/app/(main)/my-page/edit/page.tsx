import dynamic from 'next/dynamic';

const ProfileEditClient = dynamic(() => import('../../../../components/MyPage/ProfileEdit'), { ssr: false });

const EditPage = () => {
  const currentUserData = {
    currentHeight: 175,
    currentWeight: 70,
    currentGoal: '건강한 식사',
    currentNickname: '사용자',
    currentProfileImage: '/'
  };

  const handleSave = async (height: number, weight: number, goal: string, nickname: string, profileImage: string) => {
    // supabase에 업데이트 된 사용자 정보를 조회(가져오기)
  };

  const handleCancel = () => {
    // 취소 로직 구현하기
  };

  return (
    <div>
      <h1> 프로필 수정</h1>
      <ProfileEditClient {...currentUserData} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};
export default EditPage;
