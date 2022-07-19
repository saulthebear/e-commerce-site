import React, { useState, useContext } from 'react';
import logging from '../../config/logging';
import { ICategoryBody, ICategoryDocument } from '../../interfaces/product';
import { updateCategory } from '../../API/categories';
import UserContext from '../../contexts/user';

interface IUpdateCategoryFormProps {
  initialState: ICategoryDocument;
  afterSubmit: () => void;
}

const UpdateCategoryForm: React.FC<IUpdateCategoryFormProps> = ({
  initialState,
  afterSubmit,
}) => {
  const [categoryName, setCategoryName] = useState(initialState.title);
  const [categoryDescription, setCategoryDescription] = useState(
    initialState.description
  );

  const { userState } = useContext(UserContext);
  const { fire_token } = userState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: ICategoryBody = {
      title: categoryName,
      description: categoryDescription,
    };
    await updateCategory(initialState._id, body, fire_token);
    afterSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-green-300">
      <h1>Add a Category</h1>
      <div>
        <label>Name</label>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCategoryName(e.target.value)
          }
          value={categoryName}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setCategoryDescription(e.target.value)
          }
          value={categoryDescription}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default UpdateCategoryForm;
