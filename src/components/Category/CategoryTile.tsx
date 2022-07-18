import React from 'react';
import { ICategoryDocument } from '../../interfaces/product';

interface ICategoryTile {
  category: ICategoryDocument;
  setUpdatingCategory: (category: ICategoryDocument) => void;
}

const CategoryTile: React.FC<ICategoryTile> = ({
  category,
  setUpdatingCategory,
}) => {
  return (
    <div className="bg-teal-500 p-3">
      <h3>{category.title}</h3>
      <p>{category.description}</p>
      <button
        onClick={() => {
          setUpdatingCategory(category);
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default CategoryTile;
