// import React, { useEffect, useContext } from 'react';
import React, { useEffect, useState } from 'react';
import { getProducts } from '../API/products';
import Loading from '../components/Loading';
import ProductsList from '../components/Product/ProductsList';
import logging from '../config/logging';
import IPage from '../interfaces/page';
import { IProductDocument } from '../interfaces/product';

const HomePage: React.FC<IPage> = () => {
  const [products, setProducts] = useState<IProductDocument[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const data = await getProducts();

      setProducts(data.products);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>All Products</h1>
      {loading ? (
        <Loading>Loading Products...</Loading>
      ) : (
        <ProductsList products={products} />
      )}
    </>
  );
};

export default HomePage;
