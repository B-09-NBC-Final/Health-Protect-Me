import PostingUpdateForm from '@/components/Contents/PostingUpdate/PostingUpdateForm';

const PostingUpdatePage = ({ params }: { params: { id: string } }) => {
  return (
    <main>
      <div className="max-w-[1360px] pt-10 pb-64 mx-auto p-6">
        <PostingUpdateForm params={params} />
      </div>
    </main>
  );
};

export default PostingUpdatePage;
