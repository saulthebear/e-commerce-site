import IMongoDocument from './mongoDocument';
export interface ICategoryBody {
  title: string;
  description: string;
}

export interface ICategoryDocument extends ICategoryBody, IMongoDocument {}

export interface IReviewBody {
  userId: string;
  rating: number;
  comment: string;
}

export interface IReviewDocument extends IReviewBody, IMongoDocument {}
export interface IProductBody {
  title: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
  reviews: IReviewBody[];
}

export interface IProductDocument
  extends Omit<IProductBody, 'reviews'>,
    IMongoDocument {
  reviews: IReviewDocument[];
}
