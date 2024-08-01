'use client';

const PostingFilter = ({
  selectedCategory,
  setSelectedCategory
}: {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}) => {
  const categories = ['전체 글 보기', '잡담', '질문', '정보'];
  return (
    <nav className="border border-solid rounded-xl border-gray300 p-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`rounded-xl p-4 ${
            category === selectedCategory ? 'bg-primary600 text-white' : 'bg-white text-black border border-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </nav>
  );
};

export default PostingFilter;
