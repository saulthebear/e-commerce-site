// import React, { useEffect, useContext } from 'react';
import React, { useEffect, useState } from 'react';
import { getProducts } from '../API/products';
import logging from '../config/logging';
import IPage from '../interfaces/page';
import { IProductDocument } from '../interfaces/product';
// import { test } from '../API/products';
// import UserContext from '../contexts/user';

const dummy_products: IProductDocument[] = [
  {
    _id: '1',
    title: 'Product 1',
    price: 10,
    description: 'This is product 1',
    image_url: 'https://picsum.photos/200/200',
    category: {
      _id: '1',
      title: 'Category 1',
      description: 'This is category 1',
      createdAt: new Date('2020-01-01T00:00:00.000Z'),
      updatedAt: new Date('2020-01-01T00:00:00.000Z'),
    },
    reviews: [],
    createdAt: new Date('2020-01-01T00:00:00.000Z'),
    updatedAt: new Date('2020-01-01T00:00:00.000Z'),
  },
  {
    _id: '2',
    title: 'Product 2',
    price: 20,
    description: 'This is product 2',
    image_url: 'https://picsum.photos/200/200',
    category: {
      _id: '1',
      title: 'Category 1',
      description: 'This is category 1',
      createdAt: new Date('2020-01-01T00:00:00.000Z'),
      updatedAt: new Date('2020-01-01T00:00:00.000Z'),
    },
    reviews: [],
    createdAt: new Date('2020-01-01T00:00:00.000Z'),
    updatedAt: new Date('2020-01-01T00:00:00.000Z'),
  },
];

const HomePage: React.FC<IPage> = () => {
  const [products, setProducts] = useState<IProductDocument[]>(dummy_products);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     logging.info('HomePage: fetching products');
  //     const data = await getProducts();
  //     logging.info('HomePage: fetched products');
  //     logging.info(data);
  //     setProducts(data.products);
  //   };
  //   fetchProducts();
  // }, []);

  const productList = products.map((product) => {
    return (
      <div key={product._id}>
        <h3>Title: {product.title}</h3>
        <p>Description: {product.description}</p>
        <p>Price: {product.price}</p>
        {product.image_url && (
          <img src={product.image_url} alt={product.title} />
        )}
      </div>
    );
  });

  return (
    <>
      <h1>Home page</h1>
      {productList}
    </>
  );
};

export default HomePage;
