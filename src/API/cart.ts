import config from '../config/config';
import { ICart, ICartBody } from '../interfaces/user';

export const getCart = async (): Promise<ICart> => {
  const response = await fetch(`${config.server.url}/cart`);
  const data = await response.json();
  return data.cart;
};

export const updateCart = async (
  cart: ICartBody,
  token: string
): Promise<ICart> => {
  const response = await fetch(`${config.server.url}/cart`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cart),
  });
  const data = await response.json();
  console.log('data', data);
  return data.cart;
};

export const clearCart = async (token: string) => {
  return updateCart({ items: [] }, token);
};

export const checkout = async (cart: ICartBody, token: string) => {
  const response = await fetch(`${config.server.url}/checkout/create-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cart),
  });
  const data = await response.json();
  return data;
};

export const addItem = async (
  productId: string,
  cart: ICart,
  fire_token: string
) => {
  console.log(`Adding item to cart`, productId);
  const initialCartBody: ICartBody = {
    items: cart.items.map((item) => {
      return {
        product: item.product._id,
        quantity: item.quantity,
      };
    }),
  };

  const itemAlreadyInCart = initialCartBody.items.find(
    (item) => item.product === productId
  );

  let newCartBody: ICartBody;

  if (itemAlreadyInCart) {
    newCartBody = {
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
  } else {
    newCartBody = {
      items: [
        ...initialCartBody.items,
        {
          product: productId,
          quantity: 1,
        },
      ],
    };
  }

  console.log(`New cart body`, newCartBody);

  const newCart = await updateCart(newCartBody, fire_token);
  return newCart;
};

export const decrementItem = async (
  productId: string,
  cart: ICart,
  fire_token: string
) => {
  console.log(`Decrementing item in cart`, productId);
  const initialCartBody: ICartBody = {
    items: cart.items.map((item) => {
      return {
        product: item.product._id,
        quantity: item.quantity,
      };
    }),
  };

  const newCartBody: ICartBody = {
    items: initialCartBody.items
      .map((item) => {
        if (item.product === productId) {
          return {
            product: item.product,
            quantity: item.quantity - 1,
          };
        }
        return item;
      })
      .filter((item) => item.quantity > 0),
  };

  console.log(`New cart body`, newCartBody);

  const newCart = await updateCart(newCartBody, fire_token);
  return newCart;
};

export const removeItem = async (
  productId: string,
  cart: ICart,
  fire_token: string
) => {
  console.log(`Removing item from cart`, productId);
  const initialCartBody: ICartBody = {
    items: cart.items.map((item) => {
      return {
        product: item.product._id,
        quantity: item.quantity,
      };
    }),
  };

  const newItems = initialCartBody.items.filter(
    (item) => item.product !== productId
  );

  const newCartBody: ICartBody = {
    items: newItems,
  };

  console.log(`New cart body`, newCartBody);

  const newCart = await updateCart(newCartBody, fire_token);
  return newCart;
};
