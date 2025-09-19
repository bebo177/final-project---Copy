// services/wishlist.service.ts
"use server";
import { getUserToken } from "@/lib/server-utils";

export async function getWishlist() {
  try {
    const token = await getUserToken();
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/wishlist`, {
      headers: { token: token as string },
    });
    const data = await res.json();
    if (!res.ok) return { data: null, success: false, message: data.message || "Failed to fetch wishlist" };
    return { data: data.data, success: true, message: data.message || "Wishlist fetched successfully" };
  } catch (error) {
    console.log(error);
    return { data: null, success: false, message: error as string || "Something went wrong" };
  }
}

export async function addToWishlist(productId: string) {
  try {
    const token = await getUserToken();
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({ productId }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message || "Failed to add to wishlist" };
    return { success: true, message: data.message || "Added to wishlist successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: error as string || "Something went wrong" };
  }
}

export async function removeFromWishlist(productId: string) {
  try {
    const token = await getUserToken();
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/wishlist/${productId}`, {
      method: "DELETE",
      headers: { token: token as string },
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message || "Failed to remove from wishlist" };
    return { success: true, message: data.message || "Removed from wishlist successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: error as string || "Something went wrong" };
  }
}
