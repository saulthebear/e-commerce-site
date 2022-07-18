import React from 'react';
import Rating from '../components/Rating/Rating';
// import { useParams } from 'react-router-dom';
import IPage from '../interfaces/page';
import { IProductDocument } from '../interfaces/product';

const dummy_product: IProductDocument = {
  _id: '5e9f8f8f8f8f8f8f8f8f8f8f',
  title: 'Product 1',
  price: 10,
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro illum illo est, dolores exercitationem ad inventore praesentium? Beatae, quos recusandae culpa corporis eos sit quas quam enim saepe, numquam nam. Suscipit earum tempora accusamus. Molestias, beatae ducimus aperiam earum sed aspernatur. Neque, asperiores dolor repellat distinctio necessitatibus odit atque animi.',
  image_url: 'https://picsum.photos/200/200',
  category: {
    _id: '5e9f8f8f8f8f8f8f8f8f8f8f',
    title: 'Category 1',
    description: 'This is a category',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  reviews: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const ProductPage: React.FC<IPage> = () => {
  const product = dummy_product;
  // const { id } = useParams();
  return (
    <div className=" space-y-8 bg-fuchsia-400">
      <div className="space-y-3 bg-green-300">
        <img
          src={product.image_url}
          alt={product.title}
          className="aspect-square w-full p-5"
        />
        <div className="bg-purple-200 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">{product.title}</h1>
            <p>Price: {product.price}</p>
          </div>
          <Rating rating={4.68} count={10} />
        </div>
        <p>{product.description}</p>
        <div>Add to cart</div>
      </div>
      <div>
        <h2>Reviews</h2>
      </div>
    </div>
  );
};

export default ProductPage;
