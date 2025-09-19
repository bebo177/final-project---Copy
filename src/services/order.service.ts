"use server";

import { getUserToken } from "@/lib/server-utils";
import { IOrder} from "@/interface/allorders.interface";
import {
   addressFormSchema,
  addressFormType
} from "@/schema/address.schema";

export async function getAllOrders() {
  try {
    const token = await getUserToken();
    const response = await fetch(`${process.env.API_BASE_URL}/api/v1/orders/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await response.json();
    return {
      success: true,
      data: data.orders as IOrder[],
      message: data.message || "",
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

export async function handlePayment(
  formState: addressFormType,
  formData: FormData
) {
  const shippingAddress = {
    details: formData.get("details"),
    phone: formData.get("phone"),
    city: formData.get("city"),
  };
  const cartId = formData.get("cartId");
  const paymentMethod = formData.get("paymentMethod");

  const parseData = addressFormSchema.safeParse({
    ...shippingAddress,
    cartId,
    paymentMethod,
  });

  if (!parseData.success) {
    return {
      success: false,
      error: parseData.error?.flatten().fieldErrors,
      message: null,
      callbackUrl: "/cart",
      paymentMethod,
    };
  }

  try {
    const token = await getUserToken();
    const endPoint =
      paymentMethod === "cash"
        ? `api/v1/orders/${cartId}`
        : `api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`;

    const res = await fetch(`${process.env.API_BASE_URL}/${endPoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({
        shippingAddress,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message || "Failed to place order",
        callbackUrl: "/cart",
        paymentMethod,
      };
    }

    return {
      success: true,
      error: {},
      message: data.message || "Order placed successfully",
      callbackUrl:
        paymentMethod === "cash" ? "/allorders" : (data.session.url as string),
    };
  } catch (error) {
    return {
      success: false,
      error: {},
      message: error || "Failed to place order",
    };
  }
}
