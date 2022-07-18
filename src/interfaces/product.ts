export interface ICategoryBody {
  title: string;
  description: string;
}

export interface ICategoryDocument extends ICategoryBody {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IProductBody {
  title: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
}

export interface IProductDocument extends Omit<IProductBody, 'category'> {
  _id: string;
  category: ICategoryDocument;
}
