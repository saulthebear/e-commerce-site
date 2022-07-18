import config from '../config/config';
import { ICategoryBody } from '../interfaces/product';

export const createCategory = async (body: ICategoryBody, token: string) => {
  const response = await fetch(`${config.server.url}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (response.status >= 500) {
    throw {
      type: 'Server error',
    };
  }

  if (response.status >= 400) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};

export const getCategories = async () => {
  const response = await fetch(`${config.server.url}/categories`);
  return response.json();
};

export const updateCategory = async (
  id: string,
  body: Partial<ICategoryBody>,
  token: string
) => {
  const response = await fetch(`${config.server.url}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

export const deleteCategory = async (id: string, token: string) => {
  const response = await fetch(`${config.server.url}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
