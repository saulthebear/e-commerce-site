import React, { useContext, useEffect, useState } from 'react';
import { getCategories } from '../../API/categories';
import { createProduct } from '../../API/products';
import UserContext from '../../contexts/user';
import { ICategoryDocument, IProductBody } from '../../interfaces/product';
import Button from '../UI/Button';
import FormControl from '../UI/Form/FormControl';
import FormHeading from '../UI/Form/Heading';
import Input from '../UI/Form/Input';
import Label from '../UI/Form/Label';
import Select from '../UI/Form/Select';
import Textarea from '../UI/Form/Textarea';

interface IAdminProductCreateForm {
  afterSubmit: () => void;
  closeForm: () => void;
}

const AdminProductCreateForm: React.FC<IAdminProductCreateForm> = ({
  afterSubmit,
  closeForm,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [imageType, setImageType] = useState<'internal' | 'external'>('internal');
  const [category, setCategory] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalImageUrl = imageType === 'internal'
      ? `${process.env.PUBLIC_URL}/${imageUrl.replace(/^\//, '')}`
      : imageUrl;

    const body: IProductBody = {
      title,
      description,
      price,
      image_url: finalImageUrl,
      category,
      reviews: [],
    };

    await createProduct(body, fire_token);
    afterSubmit();
  };

  if (loadingCategories) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-200 px-5 py-8 mb-5">
      <FormHeading>Add a Product</FormHeading>
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
        <Label>Image</Label>
        <div className="space-y-2">
          <div className="flex gap-x-4">
            <label className="flex items-center gap-x-2">
              <input
                type="radio"
                name="imageType"
                value="internal"
                checked={imageType === 'internal'}
                onChange={(e) => setImageType('internal')}
                className="w-4 h-4"
              />
              <span className="text-sm">Internal (hosted locally)</span>
            </label>
            <label className="flex items-center gap-x-2">
              <input
                type="radio"
                name="imageType"
                value="external"
                checked={imageType === 'external'}
                onChange={(e) => setImageType('external')}
                className="w-4 h-4"
              />
              <span className="text-sm">External URL</span>
            </label>
          </div>
          <Input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setImageUrl(e.target.value)
            }
            value={imageUrl}
            placeholder={
              imageType === 'internal'
                ? 'images/products/coffee-mug.jpg'
                : 'https://example.com/image.jpg'
            }
            className="border-2 border-slate-200 p-2 w-full rounded-md"
          />
          {imageType === 'internal' && (
            <p className="text-xs text-slate-600">
              Enter path relative to public/ folder (e.g., images/products/your-image.jpg)
            </p>
          )}
        </div>
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
          onClick={closeForm}
          className="border-2 border-orange-700 text-orange-700 hover:bg-orange-100 grow"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-emerald-700 text-white hover:bg-emerald-600 grow"
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default AdminProductCreateForm;
