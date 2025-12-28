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
import Error from '../Error';
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
  // Detect if the image is internal (starts with PUBLIC_URL) or external
  const publicUrl = process.env.PUBLIC_URL || '';
  const isInternalImage = publicUrl && initialProduct.image_url.startsWith(publicUrl);
  const initialImageUrl = isInternalImage
    ? initialProduct.image_url.replace(publicUrl, '').replace(/^\//, '')
    : initialProduct.image_url;

  const [title, setTitle] = useState(initialProduct.title);
  const [description, setDescription] = useState(initialProduct.description);
  const [price, setPrice] = useState(initialProduct.price);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [imageType, setImageType] = useState<'internal' | 'external'>(
    isInternalImage ? 'internal' : 'external'
  );
  const [category, setCategory] = useState(initialProduct.category);

  const [categories, setCategories] = useState<ICategoryDocument[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
    setError('');
    setSubmitting(true);

    try {
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

      await updateProduct(initialProduct._id, body, fire_token);
      afterSubmit();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingCategories) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-200 px-5 py-8 mb-5">
      <FormHeading>Edit Product</FormHeading>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <Error error={error} />
        </div>
      )}
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
          onClick={() => setUpdatingProduct(null)}
          disabled={submitting}
          className="border-2 border-orange-700 text-orange-700 hover:bg-orange-100 grow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={submitting}
          className="bg-emerald-700 text-white hover:bg-emerald-600 grow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Updating...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default AdminProductEditForm;
