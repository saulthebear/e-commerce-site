import React, { useState, useEffect, useContext } from 'react';
import Rating from '../components/Rating/Rating';
import { useParams } from 'react-router-dom';
import IPage from '../interfaces/page';
import { IProductDocument, IReviewDocument } from '../interfaces/product';
import { dbPriceToClientPriceString } from '../utils/priceFunctions';
import Loading from '../components/UI/Loading';
import { getProduct } from '../API/products';
import logging from '../config/logging';
import { addItem } from '../API/cart';
import UserContext from '../contexts/user';
import Button from '../components/UI/Button';
import { MdAddShoppingCart } from 'react-icons/md';
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
  const { userState, userDispatch } = useContext(UserContext);
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

  const handleAddToCart = async () => {
    logging.info('handleAddToCart');
    if (!product) return;
    const newCart = await addItem(
      product._id,
      userState.user.cart,
      userState.fire_token
    );
    userDispatch({
      type: 'SET_CART',
      payload: {
        user: { ...userState.user, cart: newCart },
        fire_token: userState.fire_token,
      },
    });
  };

  if (loading) return <Loading>Loading Product...</Loading>;

  if (!id || !product) return <div>Product not found</div>;

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <img
          src={product.image_url}
          alt={product.title}
          className="aspect-square w-full p-8"
        />
        <div className="flex flex-col justify-between items-center px-5">
          <div className="flex flex-col items-center mb-5">
            <h1 className="text-3xl font-semibold">{product.title}</h1>
            <p className="text-xl">
              {dbPriceToClientPriceString(product.price)}
            </p>
          </div>
          <Rating
            rating={reviewSummary.averageRating}
            count={reviewSummary.totalReviews}
          />
        </div>
        <div className="p-5 space-y-5">
          <p className="text-slate-700">{product.description}</p>
          <Button
            className="bg-sky-600 hover:bg-sky-700 text-white text-xl w-full"
            onClick={handleAddToCart}
            size="lg"
          >
            <div className="flex justify-center items-center">
              <MdAddShoppingCart className=" mr-2" />
              Add to cart
            </div>
          </Button>
        </div>
      </div>
      {/* <div>
        <h2>Reviews</h2>
      </div> */}
    </div>
  );
};

export default ProductPage;
