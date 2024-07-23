import PostingDetailBtn from '@/components/Contents/PostingDetail/PostingDetailBtn';
import PostingDetailPost from '@/components/Contents/PostingDetail/PostingDetailPost';
import PostingDetailUser from '@/components/Contents/PostingDetail/PostingDetailUser';

const PostingDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    // 팀원들이랑 상의해서 main 공통으로 빼기
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-[1280px] p-[100px]">
        <PostingDetailPost params={params} />
        <PostingDetailUser />
        <PostingDetailBtn params={params} />
      </div>
    </main>
  );
};

export default PostingDetailPage;
