import config from '../config/config';
import {
  IOrderDocumentWithSession,
  IOrdersResponse,
} from '../interfaces/order';

export const getUserOrders = async (userId: string, token: string) => {
  const response = await fetch(`${config.server.url}/orders/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json() as Promise<IOrdersResponse>;
};

export const getOrder = async (orderId: string, token: string) => {
  const response = await fetch(`${config.server.url}/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json() as Promise<IOrderDocumentWithSession>;
};

export const getOrders = async (token: string) => {
  const response = await fetch(`${config.server.url}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json() as Promise<IOrdersResponse>;
};
