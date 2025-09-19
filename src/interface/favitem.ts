import { Brand } from "./brand";
import { Category } from "./categories";

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
  brand: Brand;
  category: Category;

  createdAt: string;
  updatedAt: string;
}