import PostingDetailPost from '@/components/Contents/PostingDetail/PostingDetailPost';

const PostingDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[1360px] p-[40px] pb-20">
        <PostingDetailPost params={params} />
      </div>
    </main>
  );
};

export default PostingDetailPage;
