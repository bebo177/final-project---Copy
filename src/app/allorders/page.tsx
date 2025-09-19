"use client";

import React, { useEffect, useState } from "react";
import { getAllOrders } from "@/services/order.service";
import { toast } from "sonner";
import { IOrder } from "@/interface/allorders.interface";

export default function AllOrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const { data, success, message } = await getAllOrders();
      if (success) setOrders(data);
      else toast.error(message || "Failed to fetch orders", { position: "top-center" });
    }
    fetchOrders();
  }, []);

  if (!orders.length) return <p className="text-center mt-20">No orders found.</p>;

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h1 className="text-xl font-semibold mb-6">All Orders</h1>
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-lg shadow-sm">
              <h2 className="font-semibold mb-2">Order #{order._id}</h2>
              <p>Status: {order.status}</p>
              <p>Total: {order.total} EGP</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
