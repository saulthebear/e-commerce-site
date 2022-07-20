import React from 'react';
import { ICategoryDocument } from '../../interfaces/product';
import Button from '../UI/Button';

interface ICategoryTile {
  category: ICategoryDocument;
  setUpdatingCategory: (category: ICategoryDocument) => void;
}

const CategoryTile: React.FC<ICategoryTile> = ({
  category,
  setUpdatingCategory,
}) => {
  return (
    <div className="flex flex-col justify-center items-center bg-slate-200 rounded-md p-5">
      <div className="p-3">
        <h3 className="font-medium uppercase text-center mb-3">
          {category.title}
        </h3>
        <p className="text-center">{category.description}</p>
      </div>
      <Button
        onClick={() => {
          setUpdatingCategory(category);
        }}
        className="text-orange-700 hover:underline"
      >
        Edit
      </Button>
    </div>
  );
};

export default CategoryTile;
