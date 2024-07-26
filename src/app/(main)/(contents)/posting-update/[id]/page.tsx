import PostingUpdateForm from '@/components/Contents/PostingUpdate/PostingUpdateForm';

const PostingUpdatePage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <PostingUpdateForm params={params} />
    </div>
  );
};

export default PostingUpdatePage;
