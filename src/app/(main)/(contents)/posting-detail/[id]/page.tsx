import PostingDetailPost from '@/components/Contents/PostingDetail/PostingDetailPost';
import PostingDetailUser from '@/components/Contents/PostingDetail/PostingDetailUser';

const PostingDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    // 팀원들이랑 상의해서 main 공통으로 빼기
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-[1280px] p-[100px]">
        <PostingDetailPost params={params} />
        <PostingDetailUser />
        <div className="mt-5 text-right">
          <button type="button" className="p-3 bg-gray-200">
            수정하기
          </button>
          <button type="button" className="p-3 bg-gray-200 ml-5">
            삭제하기
          </button>
        </div>
      </div>
    </main>
  );
};

export default PostingDetailPage;
