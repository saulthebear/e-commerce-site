import React, { useContext, useState } from 'react';
import { MdClose, MdAdd, MdRemove } from 'react-icons/md';
import { updateCart } from '../../API/cart';
import UserContext from '../../contexts/user';
import { ICart, ICartBody } from '../../interfaces/user';
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

  const incrementItem = async (productId: string) => {
    console.log(`Adding item to cart`, productId);
    const initialCartBody: ICartBody = {
      items: cart.items.map((item) => {
        return {
          product: item.product._id,
          quantity: item.quantity,
        };
      }),
    };

    const newCartBody: ICartBody = {
      items: initialCartBody.items.map((item) => {
        if (item.product === productId) {
          return {
            product: item.product,
            quantity: item.quantity + 1,
          };
        }
        return item;
      }),
    };

    console.log(`New cart body`, newCartBody);

    // Update cart
    setIsLoading(true);
    const newCart = await updateCart(newCartBody, userState.fire_token);
    console.log(`New cart`, newCart);
    userDispatch({
      type: 'SET_CART',
      payload: {
        user: { ...user, cart: newCart },
        fire_token: userState.fire_token,
      },
    });
    setIsLoading(false);
  };

  const decrementItem = async (productId: string) => {
    console.log(`Removing item from cart`, productId);
    const initialCartBody: ICartBody = {
      items: cart.items.map((item) => {
        return {
          product: item.product._id,
          quantity: item.quantity,
        };
      }),
    };

    const newCartBody: ICartBody = {
      items: initialCartBody.items.map((item) => {
        if (item.product === productId) {
          return {
            product: item.product,
            quantity: item.quantity - 1,
          };
        }
        return item;
      }),
    };

    // Remove item from cart if quantity is 0
    newCartBody.items = newCartBody.items.filter((item) => {
      return item.quantity > 0;
    });

    console.log(`New cart body`, newCartBody);

    // Update cart
    setIsLoading(true);
    const newCart = await updateCart(newCartBody, userState.fire_token);
    console.log(`New cart`, newCart);
    userDispatch({
      type: 'SET_CART',
      payload: {
        user: { ...user, cart: newCart },
        fire_token: userState.fire_token,
      },
    });
    setIsLoading(false);
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
          <button>
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
