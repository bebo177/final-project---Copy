// components/products/AddToWishlistBtn.tsx
"use client";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { addToWishlist} from "@/services/wishlist.service";
import { toast } from "sonner";
import { useWishlist } from "@/context/WishlistContext";
import { Heart } from "lucide-react";

export default function AddToWishlistBtn({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();
  const { refreshWishlist } = useWishlist();

  async function toggleWishlist() {
    startTransition(async () => {
      const res = await addToWishlist(productId);
      if (res.success) {
        toast.success(res.message, { position: "top-center" });
        refreshWishlist(); // يحدث العداد فورًا
      } else {
        toast.error(res.message, { position: "top-center" });
      }
    });
  }

  return (
    <Button disabled={isPending} onClick={toggleWishlist} variant="outline">
      <Heart className="w-5 h-5" />
    </Button>
  );
}
