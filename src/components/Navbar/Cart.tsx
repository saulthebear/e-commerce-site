import React, { useContext, useState } from 'react';
import { MdClose, MdAdd, MdRemove } from 'react-icons/md';
import {
  addItem,
  checkout,
  clearCart,
  decrementItem as decrementItemAPI,
} from '../../API/cart';
import logging from '../../config/logging';
import UserContext from '../../contexts/user';
import { dbPriceToClientPriceString } from '../../utils/priceFunctions';
import Loading from '../Loading';

export interface ICartProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
}

const Cart: React.FC<ICartProps> = ({ isOpen, setIsOpen, toggleCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userState, userDispatch } = useContext(UserContext);
  const { user } = userState;
  const { cart } = user;

  const cart_items = cart.items.map((item) => {
    const product = item.product;
    return (
      <div key={product._id} className="flex">
        <img
          src={product.image_url}
          alt={product.title}
          className="max-w-[75px]"
        />
        <div className="flex flex-col justify-center ml-2">
          <div className="">
            <p className="text-sm">{product.title}</p>
            <p className="text-sm">
              {dbPriceToClientPriceString(product.price)}
            </p>
          </div>
          <div className="flex border-[1px] w-fit border-slate-700">
            <button onClick={() => decrementItem(product._id)}>
              <MdRemove />
            </button>
            <div className="text-sm">{item.quantity}</div>
            <button onClick={() => incrementItem(product._id)}>
              <MdAdd />
            </button>
          </div>
        </div>
      </div>
    );
  });

  const incrementItem = async (product_id: string) => {
    setIsLoading(true);
    const newCart = await addItem(product_id, cart, userState.fire_token);
    userDispatch({
      type: 'SET_CART',
      payload: {
        user: { ...userState.user, cart: newCart },
        fire_token: userState.fire_token,
      },
    });
    setIsLoading(false);
  };

  const decrementItem = async (product_id: string) => {
    setIsLoading(true);
    const newCart = await decrementItemAPI(
      product_id,
      cart,
      userState.fire_token
    );

    userDispatch({
      type: 'SET_CART',
      payload: {
        user: { ...userState.user, cart: newCart },
        fire_token: userState.fire_token,
      },
    });
    setIsLoading(false);
  };

  const handleCheckout = async () => {
    console.log('Checking out');
    setIsLoading(true);
    const cartBody = {
      items: cart.items.map((item) => {
        return {
          product: item.product._id,
          quantity: item.quantity,
        };
      }),
    };
    const response = await checkout(cartBody, userState.fire_token);
    console.log(`Checkout response`, response);

    if (!response.session && response.session.url) {
      logging.error(`Checkout error`, response);
      setIsLoading(false);
      return;
    }

    // Clear cart
    setIsLoading(false);
    setIsOpen(false);
    clearCart(userState.fire_token);

    // Redirect to checkout page
    window.location.href = response.session.url;
  };

  const totalPrice = cart.items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <>
      <div
        className={`bg-white h-screen w-72 p-6 fixed top-0 right-0 z-50 ease-in-out duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-8">
          <button onClick={toggleCart}>
            <MdClose size="1.5em" />
          </button>
        </div>
        {isLoading ? <Loading>Loading cart...</Loading> : <>{cart_items}</>}
        <div>
          <p className="text-sm">
            Total: {dbPriceToClientPriceString(totalPrice)}
          </p>
          <button onClick={handleCheckout}>
            <p className="text-sm">Checkout</p>
          </button>
        </div>
      </div>
      {/* backdrop */}
      {isOpen && (
        <div
          className="bg-slate-900/30 fixed inset-0 z-40"
          onClick={toggleCart}
        ></div>
      )}
    </>
  );
};

export default Cart;
