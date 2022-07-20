import React, { useState, useEffect } from 'react';
import { ICategoryDocument } from '../../interfaces/product';
import { getCategories } from '../../API/categories';
import Loading from '../../components/UI/Loading';
import CategoryTile from '../../components/Category/AdminCategoryTile';
import CreateCategoryForm from '../../components/Category/AdminCreateCategoryForm';
import UpdateCategoryForm from '../../components/Category/AdminUpdateCategoryForm';
import PageHead from '../../components/UI/PageHead';
import Button from '../../components/UI/Button';

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
          closeForm={() => setShowCreateForm(false)}
        />
      )}
      {updatingCategory && (
        <UpdateCategoryForm
          initialState={updatingCategory}
          afterSubmit={() => {
            setUpdatingCategory(null);
            fetchCategories();
          }}
          setUpdatingCategory={setUpdatingCategory}
        />
      )}
      <div>
        <PageHead title="All Categories">
          {!showCreateForm && (
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-red-700 text-white hover:bg-red-600"
            >
              Create Category
            </Button>
          )}
        </PageHead>
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
