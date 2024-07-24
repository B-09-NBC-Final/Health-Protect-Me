type CategoryProps = {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

const CategoryMain: React.FC<CategoryProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="mb-8">
      <p className="text-sm text-blue-500 mb-2">카테고리를 선택해주세요.</p>
      <div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 ml-3 border-spacing-1 ${
              selectedCategory === category ? 'bg-[#64D1B7] text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-[#1DB898] hover:text-white transition-colors duration-300`}
          >
            {category}
          </button>
        ))}
      </div>
      {selectedCategory && <p className="text-sm text-green-500 mt-2">선택된 카테고리: {selectedCategory}</p>}
    </div>
  );
};

export default CategoryMain;
