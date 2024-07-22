import React from 'react';

const PostingDetailPage = ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  return <div>PostingDetailPage</div>;
};

export default PostingDetailPage;
