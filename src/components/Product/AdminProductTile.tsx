import React from 'react';
import { IProductDocument } from '../../interfaces/product';
import { dbPriceToClientPriceString } from '../../utils/priceFunctions';
import ProductTile from './ProductTile';

interface IAdminProductTile {
  product: IProductDocument;
  setUpdatingProduct: (product: IProductDocument) => void;
}

const AdminProductTile: React.FC<IAdminProductTile> = ({
  product,
  setUpdatingProduct,
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <ProductTile product={product} />
      <button
        onClick={() => {
          setUpdatingProduct(product);
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default AdminProductTile;
