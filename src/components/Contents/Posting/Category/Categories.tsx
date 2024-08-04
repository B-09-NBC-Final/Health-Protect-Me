import React, { useState, useEffect } from 'react';
import { Category } from '@/types/tags';

type CategoryProps = {
  categories: Category[];
  selectedCategories: string;
  onSelectCategory: (categoryId: string) => void;
};

const CategoryMain = ({ categories, selectedCategories, onSelectCategory }: CategoryProps): JSX.Element => {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(selectedCategories.length === 0);
  }, [selectedCategories]);

  return (
    <div className="mb-8">
      <div>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              onSelectCategory(category.id);
              setShowError(false);
            }}
            className={`px-4 py-2 ml-2 border-gray300 rounded-xl w-[72px] ${
              selectedCategories.includes(category.id)
                ? 'bg-pramary600 text-white'
                : 'bg-white text-gray900 border-spacing-1 border border-solid'
            } hover:bg-pramary600 hover:text-white transition-colors duration-300`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryMain;
