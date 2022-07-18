import React, { useState, useEffect } from 'react';
import { ICategoryDocument } from '../../interfaces/product';
import { getCategories } from '../../API/categories';
import Loading from '../../components/Loading';
import CategoryTile from '../../components/Category/CategoryTile';
import CreateCategoryForm from '../../components/Category/CreateCategoryForm';
import UpdateCategoryForm from '../../components/Category/UpdateCategoryForm';

const AdminCategories = () => {
  const [categories, setCategories] = useState<ICategoryDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [updatingCategory, setUpdatingCategory] =
    useState<ICategoryDocument | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    const data: { count: number; categories: ICategoryDocument[] } =
      await getCategories();
    setCategories(data.categories);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const categoryList = categories.map((category) => {
    return (
      <CategoryTile
        category={category}
        setUpdatingCategory={setUpdatingCategory}
        key={category._id}
      />
    );
  });

  return (
    <div>
      {showCreateForm && (
        <CreateCategoryForm
          afterSubmit={() => {
            fetchCategories();
            setShowCreateForm(false);
          }}
        />
      )}
      {updatingCategory && (
        <UpdateCategoryForm
          initialState={updatingCategory}
          afterSubmit={() => {
            setUpdatingCategory(null);
            fetchCategories();
          }}
        />
      )}
      <div>
        <h1>Categories</h1>
        <button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : 'Create Category'}
        </button>
        {loading ? (
          <Loading>Loading Categories</Loading>
        ) : (
          <div className="grid grid-cols-2 gap-5">{categoryList}</div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
