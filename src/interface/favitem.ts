import { IBrand } from "./brand.interface";
import { ICategory } from "./category.interface";

export interface FavItem {
    _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  imageCover: string;
  images: string[];
  price: number;
  quantity: number;
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  brand: IBrand;
  category: ICategory;

  createdAt: string;
  updatedAt: string;
}
