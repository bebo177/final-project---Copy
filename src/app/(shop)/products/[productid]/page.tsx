import AddToCartBtn from "@/components/products/AddToCartBtn";
import ProductSlider from "@/components/products/ProductSlider";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/interface/product.interface";
import { getProductDetails } from "@/services/products.service";
import { Heart, Star, Truck } from "lucide-react";

export default async function ProductDetails({
  params: { productid },
}: {
  params: { productid: string };
}) {
  const { data: product }: { data: IProduct } = await getProductDetails(productid);

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? [product.imageCover, ...product.images]
      : [product.imageCover];

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProductSlider images={images} />
          </div>
          <div className="lg:col-span-1">
            <h1 className="font-bold text-2xl mb-4">{product.title}</h1>

            <div className="flex items-center gap-x-1 mb-4">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-gray-500">
                {product.ratingsAverage}
              </span>
            </div>

            <span className="text-2xl mb-6 block text-red-500">
              {product.price} EGP
            </span>

            <p className="text-sm text-gray-600 border-b border-gray-300 pb-6 mb-6">
              {product.description}
            </p>

            <div className="flex gap-4 mb-10">
              <AddToCartBtn
                productId={product._id}
                className="flex-1"
                variant="destructive"
              />
              <Button variant="outline">
                <Heart />
              </Button>
            </div>

            <ul className="border border-black/50 divide-y divide-black/50 rounded-lg">
              <li className="p-5 flex gap-4">
                <Truck size={40} />
                <div className="font-medium">
                  <p className="mb-2">Free Delivery</p>
                  <span className="text-xs text-gray-600">
                    Enter your postal code for delivery
                  </span>
                </div>
              </li>
              <li className="p-5 flex gap-4">
                <Truck size={40} />
                <div className="font-medium">
                  <p className="mb-2">Return Delivery</p>
                  <span className="text-xs text-gray-600">
                    Free 30 Days Delivery Returns
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
