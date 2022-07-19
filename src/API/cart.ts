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
