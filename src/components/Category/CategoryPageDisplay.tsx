import React from 'react';
import { IProductDocument } from '../../interfaces/product';
import Loading from '../UI/Loading';
import ProductsList from '../Product/ProductsList';
import PageHead from '../UI/PageHead';

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
      <PageHead title={title} description={description} />
      {isLoading ? (
        <Loading>Loading Products...</Loading>
      ) : (
        <ProductsList products={products} />
      )}
    </div>
  );
};

export default CategoryPageDisplay;
