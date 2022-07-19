import { IProductDocument } from './product';

enum UserRoles {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

export interface ICart {
  items: {
    product: IProductDocument;
    quantity: number;
  }[];
}

export interface ICartBody {
  items: {
    product: string;
    quantity: number;
  }[];
}

export default interface IUser {
  _id: string;
  uid: string;
  name: string;
  email: string;
  role: UserRoles;
  cart: ICart;
}

export const DEFAULT_USER: IUser = {
  _id: '',
  uid: '',
  name: '',
  email: '',
  role: UserRoles.CUSTOMER,
  cart: {
    items: [],
  },
};

export const DEFAULT_FIRE_TOKEN = '';
