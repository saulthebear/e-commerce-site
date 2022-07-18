import React, { useContext, useState } from 'react';
import { createProduct } from '../../API/products';
import logging from '../../config/logging';
import UserContext from '../../contexts/user';
import { IProductBody } from '../../interfaces/product';

interface IAdminProductCreateForm {
  afterSubmit: () => void;
}

const AdminProductCreateForm: React.FC<IAdminProductCreateForm> = ({
  afterSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');

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
    await createProduct(body, fire_token);
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
      <button type="submit">Create</button>
    </form>
  );
};

export default AdminProductCreateForm;
