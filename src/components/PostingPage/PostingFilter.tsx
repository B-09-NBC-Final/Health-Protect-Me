'use client';

const PostingFilter = ({ setSelectedCategory }: { setSelectedCategory: (category: string) => void }) => {
  return (
    <ul className="border border-solid rounded-xl border-gray300 p-2">
      <li onClick={() => setSelectedCategory('전체 글 보기')} className="bg-pramary600 rounded-xl text-white p-4">
        전체 글 보기
      </li>
      <li onClick={() => setSelectedCategory('잡담')} className="p-4">
        잡담
      </li>
      <li onClick={() => setSelectedCategory('질문')} className="p-4">
        질문
      </li>
      <li onClick={() => setSelectedCategory('정보')} className="p-4">
        정보
      </li>
    </ul>
  );
};

export default PostingFilter;
