"use client";
import React, { useEffect, useState } from "react";
import Productitem from "@/components/products/Productitem";
import { getWishlist, removeFromWishlist } from "@/services/wishlist.service";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/interface/product.interface";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<IProduct[]>([]);
  const { refreshWishlist } = useWishlist();

  async function loadWishlist() {
    const { data, success } = await getWishlist();
    if (success) setWishlistItems(data);
  }

  useEffect(() => {
    loadWishlist();
  }, []);

  async function handleRemove(productId: string) {
    const res = await removeFromWishlist(productId);
    if (res.success) {
      toast.success(res.message, { position: "top-center" });

      setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
      refreshWishlist();
    } else {
      toast.error(res.message, { position: "top-center" });
    }
  }

  if (!wishlistItems.length) {
    return <p className="text-center mt-20">Your wishlist is empty.</p>;
  }

  return (
    <section className="py-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlistItems.map((product) => (
          <div key={product._id} className="relative">
            <Productitem product={product} />
            <Button
              onClick={() => handleRemove(product._id)}
              variant="destructive"
              className="mt-2 w-full"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
