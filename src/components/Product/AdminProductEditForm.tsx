import React, { useContext, useState } from 'react';
import { updateProduct } from '../../API/products';
import logging from '../../config/logging';
import UserContext from '../../contexts/user';
import { IProductBody, IProductDocument } from '../../interfaces/product';

interface IAdminProductEditFormProps {
  initialProduct: IProductDocument;
  afterSubmit: () => void;
  setUpdatingProduct: (product: IProductDocument | null) => void;
}

const AdminProductEditForm: React.FC<IAdminProductEditFormProps> = ({
  initialProduct,
  afterSubmit,
  setUpdatingProduct,
}) => {
  const [title, setTitle] = useState(initialProduct.title);
  const [description, setDescription] = useState(initialProduct.description);
  const [price, setPrice] = useState(initialProduct.price);
  const [imageUrl, setImageUrl] = useState(initialProduct.image_url);
  const [category, setCategory] = useState(initialProduct.category._id);

  const { userState } = useContext(UserContext);
  const { fire_token } = userState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: IProductBody = {
      title,
      description,
      price,
      image_url: imageUrl,
      category,
      reviews: [],
    };
    logging.info('AdminProducts.createProduct');
    logging.info(`title: ${title}`);
    logging.info(`description: ${description}`);
    logging.info(`price: ${price}`);
    logging.info(`imageUrl: ${imageUrl}`);
    logging.info(`category: ${category}`);
    await updateProduct(initialProduct._id, body, fire_token);
    afterSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-green-300">
      <h1>Add a Product</h1>
      <div>
        <label>Title</label>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          value={title}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          value={description}
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrice(Number(e.target.value))
          }
          value={price}
        />
      </div>
      <div>
        <label>Image URL</label>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setImageUrl(e.target.value)
          }
          value={imageUrl}
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCategory(e.target.value)
          }
          value={category}
        />
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={() => setUpdatingProduct(null)}>
        Cancel
      </button>
    </form>
  );
};

export default AdminProductEditForm;
