// import React, { useEffect, useContext } from 'react';
import React, { useEffect, useState } from 'react';
import { getProducts } from '../API/products';
import CategoryPageDisplay from '../components/Category/CategoryPageDisplay';
import Loading from '../components/UI/Loading';
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

  if (loading) {
    return <Loading>Loading Products...</Loading>;
  }

  return (
    <CategoryPageDisplay
      title="All Products"
      description="This is everything we’ve got. If you want to buy it all, we definitely won’t stop you."
      products={products}
      isLoading={loading}
    />
  );
};

export default HomePage;
