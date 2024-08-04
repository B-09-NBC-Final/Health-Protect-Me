import PostingDetailPost from '@/components/Contents/PostingDetail/PostingDetailPost';

const PostingDetailPage = ({ params }: { params: { id: string } }) => {
  return <PostingDetailPost params={params} />;
};

export default PostingDetailPage;
