import React, { useState, useEffect } from 'react';
import Rating from '../components/Rating/Rating';
import { useParams } from 'react-router-dom';
import IPage from '../interfaces/page';
import { IProductDocument, IReviewDocument } from '../interfaces/product';
import { dbPriceToClientPriceString } from '../utils/priceFunctions';
import Loading from '../components/Loading';
import { getProduct } from '../API/products';
import logging from '../config/logging';

interface IReviewSummary {
  averageRating: number;
  totalReviews: number;
}

const initialReviewSummary = {
  averageRating: 0,
  totalReviews: 0,
} as IReviewSummary;

const summarizeReviews = (reviews: IReviewDocument[]): IReviewSummary => {
  if (reviews.length === 0) return initialReviewSummary;
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  return { averageRating, totalReviews };
};

const ProductPage: React.FC<IPage> = () => {
  // const product = dummy_product;
  const { id } = useParams();
  const [product, setProduct] = useState<IProductDocument>();
  const [loading, setLoading] = useState(false);
  const [reviewSummary, setReviewSummary] =
    useState<IReviewSummary>(initialReviewSummary);

  useEffect(() => {
    if (product) {
      setReviewSummary(summarizeReviews(product.reviews));
      console.dir(product);
      logging.info(product.reviews);
      logging.info(reviewSummary);
    }
  }, [product]);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      setLoading(true);
      const data = await getProduct(id);
      setProduct(data.product);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Loading>Loading Product...</Loading>;

  if (!id || !product) return <div>Product not found</div>;

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
            <p>{dbPriceToClientPriceString(product.price)}</p>
          </div>
          <Rating
            rating={reviewSummary.averageRating}
            count={reviewSummary.totalReviews}
          />
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
