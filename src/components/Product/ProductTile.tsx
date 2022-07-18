import React from 'react';
import { IProductDocument } from '../../interfaces/product';
import { dbPriceToClientPriceString } from '../../utils/priceFunctions';

interface IProductTile {
  product: IProductDocument;
}

const ProductTile: React.FC<IProductTile> = ({ product }) => {
  return (
    <div className="bg-lime-300 p-3 w-full h-full">
      {product.image_url && <img src={product.image_url} alt={product.title} />}
      <div>{product.title}</div>
      <div>{dbPriceToClientPriceString(product.price)}</div>
    </div>
  );
};

export default ProductTile;
