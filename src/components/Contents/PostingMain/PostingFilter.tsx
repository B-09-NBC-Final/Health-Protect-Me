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
    <nav className="flex flex-col border border-solid rounded-xl border-gray300 p-2">
      {categories.map((category, idx) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`h-[40px] rounded-xl text-sm text-left py-3 px-4 ${
            category === selectedCategory
              ? 'bg-pramary500 text-white font-semibold'
              : 'bg-white text-black border-gray-300'
          } ${idx < categories.length - 1 ? 'mb-2' : ''}`}
        >
          {category}
        </button>
      ))}
    </nav>
  );
};

export default PostingFilter;
