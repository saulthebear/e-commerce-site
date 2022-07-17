import config from '../config/config';
import logging from '../config/logging';
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
  return response.json();
};

export const getProducts = async () => {
  const response = await fetch(`${config.server.url}/products`);
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

// export const test = async (token: string) => {
//   logging.info('testing products api');
//   let response = {};
//   // logging.info('creating product');
//   // const response = await createProduct(
//   //   {
//   //     title: 'Test',
//   //     description: 'Test',
//   //     price: 1,
//   //     category: '62d485ba12bd55ee17386c85',
//   //   },
//   //   token
//   // );

//   // logging.info('getting products');
//   // response = await getProducts();
//   // logging.info(response);

//   // logging.info('getting 1 product');
//   // response = await getProduct('62d37d2e167966f3d8d0fe2c');
//   // logging.info(response);

//   // logging.info('updating product');
//   // response = await updateProduct(
//   //   '62d37d2e167966f3d8d0fe2c',
//   //   {
//   //     title: 'Test updated',
//   //   },
//   //   token
//   // );
//   // logging.info(response);

//   // logging.info('delete product');
//   // response = await deleteProduct('62d37d2e167966f3d8d0fe2c', token);
//   // logging.info(response);

// };
