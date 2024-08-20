import PostingUpdateForm from '@/components/Contents/PostingUpdatePage/PostingUpdateForm';

const PostingUpdatePage = ({ params }: { params: { id: string } }) => {
  return <PostingUpdateForm params={params} />;
};

export default PostingUpdatePage;
