import { Category } from '@/types/tags';

type CategoryProps = {
  categories: Category[];
  selectedCategories: string;
  onSelectCategory: (categoryId: string) => void;
};

const CategoryMain = ({ categories, selectedCategories, onSelectCategory }: CategoryProps): JSX.Element => {
  return (
    <div className="mb-8">
      <p className="text-sm text-blue-500 mb-2">카테고리를 선택해주세요.</p>
      <div>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-4 py-2 ml-3 border-spacing-1 ${
              selectedCategories.includes(category.id) ? 'bg-[#64D1B7] text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-[#1DB898]  hover:text-white transition-colors duration-300`}
          >
            {category.name}
          </button>
        ))}
      </div>
      {/* {selectedCategories.length > 0 && (
        <p className="text-sm text-green-500 mt-2">
          {categories
            .filter((cat) => selectedCategories.includes(cat.id))
            .map((cat) => cat.name)
            .join(', ')}
        </p>
      )} */}
    </div>
  );
};

export default CategoryMain;
