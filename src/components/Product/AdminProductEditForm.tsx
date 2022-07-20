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
import Button from '../UI/Button';
import FormControl from '../UI/Form/FormControl';
import FormHeading from '../UI/Form/Heading';
import Input from '../UI/Form/Input';
import Label from '../UI/Form/Label';
import Select from '../UI/Form/Select';
import Textarea from '../UI/Form/Textarea';

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
    <form onSubmit={handleSubmit} className="bg-slate-200 px-5 py-8 mb-5">
      <FormHeading>Edit Product</FormHeading>
      <FormControl>
        <Label>Title</Label>
        <Input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          value={title}
        />
      </FormControl>
      <FormControl>
        <Label>Description</Label>
        <Textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          value={description}
        />
      </FormControl>
      <FormControl>
        <Label>Price</Label>
        <Input
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrice(Number(e.target.value))
          }
          value={price}
        />
      </FormControl>
      <FormControl>
        <Label>Image URL</Label>
        <Input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setImageUrl(e.target.value)
          }
          value={imageUrl}
        />
      </FormControl>
      <FormControl>
        <Label>Categories</Label>
        <Select
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
        </Select>
      </FormControl>
      <div className="flex gap-x-5">
        <Button
          type="button"
          onClick={() => setUpdatingProduct(null)}
          className="border-2 border-orange-700 text-orange-700 hover:bg-orange-100 grow"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-emerald-700 text-white hover:bg-emerald-600 grow"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AdminProductEditForm;
