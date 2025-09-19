"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { CartContextProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartContextProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartContextProvider>
    </SessionProvider>
  );
}
