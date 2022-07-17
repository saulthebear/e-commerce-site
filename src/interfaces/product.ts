export interface IProductBody {
  title: string;
  description: string;
  price: number;
  category: string;
}

export interface IProductDocument extends IProductBody {
  _id: string;
}
