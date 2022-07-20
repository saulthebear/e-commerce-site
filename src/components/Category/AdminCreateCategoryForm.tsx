import React, { useState, useContext } from 'react';
import { ICategoryBody } from '../../interfaces/product';
import { createCategory } from '../../API/categories';
import UserContext from '../../contexts/user';
import FormHeading from '../UI/Form/Heading';
import FormControl from '../UI/Form/FormControl';
import Label from '../UI/Form/Label';
import Input from '../UI/Form/Input';
import Textarea from '../UI/Form/Textarea';
import Button from '../UI/Button';

interface ICreateCategoryFormProps {
  afterSubmit: () => void;
  closeForm: () => void;
}

const CreateCategoryForm: React.FC<ICreateCategoryFormProps> = ({
  afterSubmit,
  closeForm,
}) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  const { userState } = useContext(UserContext);
  const { fire_token } = userState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: ICategoryBody = {
      title: categoryName,
      description: categoryDescription,
    };
    await createCategory(body, fire_token);
    afterSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-200 px-5 py-8 mb-5">
      <FormHeading>Add a Category</FormHeading>
      <FormControl>
        <Label>Name</Label>
        <Input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCategoryName(e.target.value)
          }
          value={categoryName}
        />
      </FormControl>
      <FormControl>
        <Label>Description</Label>
        <Textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setCategoryDescription(e.target.value)
          }
          value={categoryDescription}
        />
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

export default CreateCategoryForm;
