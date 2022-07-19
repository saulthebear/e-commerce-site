import React from 'react';
import { IProductDocument } from '../../interfaces/product';
import { dbPriceToClientPriceString } from '../../utils/priceFunctions';

interface IProductTile {
  product: IProductDocument;
}

const ProductTile: React.FC<IProductTile> = ({ product }) => {
  return (
    <div className="p-3 w-full h-full">
      {product.image_url && <img src={product.image_url} alt={product.title} />}
      <div className="uppercase text-sm text-center font-semibold">
        {product.title}
      </div>
      <div className="text-center">
        {dbPriceToClientPriceString(product.price)}
      </div>
    </div>
  );
};

export default ProductTile;
