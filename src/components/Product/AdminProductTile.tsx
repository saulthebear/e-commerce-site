import React from 'react';
import { IProductDocument } from '../../interfaces/product';
import { dbPriceToClientPriceString } from '../../utils/priceFunctions';

interface IAdminProductTile {
  product: IProductDocument;
  setUpdatingProduct: (product: IProductDocument) => void;
}

const AdminProductTile: React.FC<IAdminProductTile> = ({
  product,
  setUpdatingProduct,
}) => {
  return (
    <div className="bg-lime-300 p-3 w-full h-full">
      {product.image_url && <img src={product.image_url} alt={product.title} />}
      <div>{product.title}</div>
      <div>{dbPriceToClientPriceString(product.price)}</div>
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
