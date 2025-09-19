
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getWishlist } from "@/services/wishlist.service";

interface WishlistContextType {
  count: number;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType>({
  count: 0,
  refreshWishlist: async () => {},
});

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  async function refreshWishlist() {
    const { data } = await getWishlist();
    setCount(Array.isArray(data) ? data.length : 0);
  }

  useEffect(() => {
    refreshWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ count, refreshWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
