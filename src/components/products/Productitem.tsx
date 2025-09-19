
import Image from "next/image";
import { Star } from "lucide-react";
import { IProduct } from "../../interface/product.interface";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import AddToWishlistBtn from "../wishlist/AddToWishlistBtn";


export default function Productitem({ product }: { product: IProduct }) {
  return (
    <div>
      <picture className="relative group overflow-hidden">
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.imageCover}
            alt={product.title}
            width={270}
            height={250}
            loading="lazy"
            unoptimized
            className="w-full h-[15.625rem] object-contain bg-gray-100 mb-4"
          />
        </Link>

        <div className="absolute bottom-2 left-2 flex gap-2">
          <AddToCartBtn
            productId={product._id}
            className="px-3 py-1 text-sm"
            variant="destructive"
          />
          <AddToWishlistBtn productId={product._id} />
        </div>
      </picture>

      <h3 className="font-medium mb-2 line-clamp-1">
        <Link href={`/products/${product._id}`}>{product.title}</Link>
      </h3>

      <div className="flex items-center gap-x-2">
        <span className="font-medium text-red-500">{product.price} EGP</span>
        <div className="flex items-center gap-x-1">
          <Star className="text-yellow-400 fill-amber-400" />
          <span className="text-sm font-semibold text-gray-500">
            {product.ratingsAverage}
          </span>
        </div>
      </div>
    </div>
  );
}
