import React, { useContext, useEffect, useState } from 'react';
import { getCategories } from '../../API/categories';
import { updateProduct } from '../../API/products';
import logging from '../../config/logging';
import UserContext from '../../contexts/user';
import {
  ICategoryDocument,
  IProductBody,
  IProductDocument,
} from '../../interfaces/product';

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
  const [category, setCategory] = useState(initialProduct.category);

  const [categories, setCategories] = useState<ICategoryDocument[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const { userState } = useContext(UserContext);
  const { fire_token } = userState;

  const fetchCategories = async () => {
    setLoadingCategories(true);
    const response = await getCategories();
    setCategories(response.categories);
    console.log(response);
    setLoadingCategories(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  console.log(`The currently selected category is: ${category}`);
  console.log(`The initial product is:`, initialProduct);
  console.log(`The first category is: ${categories[0]?._id}`);

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

    await updateProduct(initialProduct._id, body, fire_token);
    afterSubmit();
  };

  if (loadingCategories) {
    return <div>Loading...</div>;
  }

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
        <label>Categories</label>
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCategory(e.target.value)
          }
          value={category === '' ? categories[0]?._id : category}
        >
          {categories.map((category_option) => (
            <option key={category_option._id} value={category_option._id}>
              {category_option.title}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={() => setUpdatingProduct(null)}>
        Cancel
      </button>
    </form>
  );
};

export default AdminProductEditForm;
