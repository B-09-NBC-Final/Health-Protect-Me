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
            className={`px-4 py-2 ml-3 border-spacing-1 rounded-md ${
              selectedCategories.includes(category.id) ? 'bg-[#64D1B7] text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-[#1DB898] hover:text-white transition-colors duration-300`} 
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryMain;