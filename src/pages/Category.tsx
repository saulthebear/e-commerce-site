import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../API/products';
import { getCategory } from '../API/categories';
import { ICategoryDocument, IProductDocument } from '../interfaces/product';
import Loading from '../components/Loading';
import CategoryPageDisplay from '../components/Category/CategoryPageDisplay';

const Category = () => {
  const categoryId = useParams().id;
  const [products, setProducts] = useState<IProductDocument[]>([]);
  const [category, setCategory] = useState<ICategoryDocument>();
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    if (!categoryId) return;
    const fetchProducts = async () => {
      setLoadingProducts(true);
      const data = await getProductsByCategory(categoryId);
      setProducts(data.products);
      setLoadingProducts(false);
    };
    const fetCategory = async () => {
      setLoadingCategory(true);
      const data = await getCategory(categoryId);
      setCategory(data.category);
      setLoadingCategory(false);
    };
    fetCategory();
    fetchProducts();
  }, [categoryId]);

  if (loadingCategory) {
    return <Loading>Loading Category...</Loading>;
  } else {
    if (!category) {
      return <div>Category not found</div>;
    }
  }

  return (
    <CategoryPageDisplay
      title={category.title}
      description={category.description}
      products={products}
      isLoading={loadingProducts}
    />
  );
};

export default Category;
