import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../API/products';
import { getCategory } from '../API/categories';
import ProductsList from '../components/Product/ProductsList';
import logging from '../config/logging';
import { ICategoryDocument, IProductDocument } from '../interfaces/product';

const Category = () => {
  const categoryId = useParams().id;
  const [products, setProducts] = useState<IProductDocument[]>([]);
  const [category, setCategory] = useState<ICategoryDocument>();
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    if (!categoryId) return;
    const fetchProducts = async () => {
      logging.info(`Fetching products for category ${categoryId}`);
      setLoadingProducts(true);
      const data = await getProductsByCategory(categoryId);
      setProducts(data.products);
      logging.info(`Fetched ${data.products.length} products`);
      logging.info(data);
      setLoadingProducts(false);
    };
    const fetCategory = async () => {
      logging.info(`Fetching category ${categoryId}`);
      setLoadingCategory(true);
      const data = await getCategory(categoryId);
      setCategory(data.category);
      logging.info(`Fetched category ${data.category.name}`);
      logging.info(data);
      setLoadingCategory(false);
    };
    fetCategory();
    fetchProducts();
  }, [categoryId]);

  if (loadingCategory) {
    return <div>Loading category...</div>;
  } else {
    if (!category) {
      return <div>Category not found</div>;
    }
  }

  return (
    <div>
      <h1>{category.title}</h1>
      <p>{category.description}</p>
      {loadingProducts ? (
        <div>Loading Products...</div>
      ) : (
        <ProductsList products={products} />
      )}
    </div>
  );
};

export default Category;
