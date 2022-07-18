import React from 'react';
import { Link } from 'react-router-dom';
import { IProductDocument } from '../../interfaces/product';
import ProductTile from './ProductTile';

const ProductsList: React.FC<{ products: IProductDocument[] }> = ({
  products,
}) => {
  const productList = products.map((product) => {
    return (
      <Link to={`/products/${product._id}`} key={product._id}>
        <ProductTile product={product} />
      </Link>
    );
  });

  if (productList.length === 0) {
    return <div>No products found</div>;
  }

  return <div className="grid grid-cols-2 gap-5">{productList}</div>;
};

export default ProductsList;
