import React from 'react';
import { IProductDocument } from '../../interfaces/product';
import Loading from '../Loading';
import ProductsList from '../Product/ProductsList';

interface ICategoryPageDisplayProps {
  title: string;
  description: string;
  products: IProductDocument[];
  isLoading: boolean;
}

const CategoryPageDisplay: React.FC<ICategoryPageDisplayProps> = ({
  products,
  isLoading,
  title,
  description,
}) => {
  return (
    <div>
      <div className="flex flex-col items-center mb-8 px-2 ">
        <h1 className="font-medium text-3xl uppercase mb-3">{title}</h1>
        <p className="text-center text-slate-700">{description}</p>
      </div>
      {isLoading ? (
        <Loading>Loading Products...</Loading>
      ) : (
        <ProductsList products={products} />
      )}
    </div>
  );
};

export default CategoryPageDisplay;
