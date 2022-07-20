import { IProductDocument } from './product';

export interface IOrderDocument {
  _id: string;
  userId: string;
  products: {
    product: IProductDocument;
    quantity: number;
    price: number;
    _id: string;
  }[];
  stripeSessionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrdersResponse {
  count: number;
  orders: IOrderDocument[];
}

export interface ISessionDocument {
  id: string;
  amount_total: number;
  payment_status:
    | 'requires_action'
    | 'requires_confirmation'
    | 'requires_payment_method'
    | 'paid'
    | 'canceled'
    | 'failed'
    | 'unpaid';
  status:
    | 'requires_action'
    | 'requires_confirmation'
    | 'requires_payment_method'
    | 'complete'
    | 'paid'
    | 'canceled'
    | 'failed'
    | 'unpaid';
  url: string | null;
}

export interface IOrderDocumentWithSession {
  order: IOrderDocument;
  session: ISessionDocument;
}
