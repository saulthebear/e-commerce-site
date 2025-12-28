import config from '../config/config';
import { IProductBody } from '../interfaces/product';

export const createProduct = async (body: IProductBody, token: string) => {
  const response = await fetch(`${config.server.url}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `HTTP error ${response.status}`);
  }

  return response.json();
};

export const getProducts = async () => {
  const response = await fetch(`${config.server.url}/products`);
  return response.json();
};

export const getProductsByCategory = async (categoryId: string) => {
  const response = await fetch(
    `${config.server.url}/products/category/${categoryId}`
  );
  return response.json();
};

export const getProduct = async (id: string) => {
  const response = await fetch(`${config.server.url}/products/${id}`);
  return response.json();
};

export const updateProduct = async (
  id: string,
  body: Partial<IProductBody>,
  token: string
) => {
  const response = await fetch(`${config.server.url}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `HTTP error ${response.status}`);
  }

  return response.json();
};

export const deleteProduct = async (id: string, token: string) => {
  const response = await fetch(`${config.server.url}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
