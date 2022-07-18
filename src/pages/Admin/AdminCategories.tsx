import React, { useState, useContext } from 'react';
import logging from '../../config/logging';
import { ICategoryBody } from '../../interfaces/product';
import { createCategory } from '../../API/categories';
import UserContext from '../../contexts/user';

const AdminCategories = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const { userState } = useContext(UserContext);
  const { fire_token } = userState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    const body: ICategoryBody = {
      title: categoryName,
      description: categoryDescription,
    };
    logging.info('AdminCategories.createCategory');
    logging.info(`categoryName: ${categoryName}`);
    logging.info(`categoryDescription: ${categoryDescription}`);
    try {
      const response = await createCategory(body, fire_token);
    } catch (error) {
      logging.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
      AdminCategories
    </div>
  );
};

export default AdminCategories;
