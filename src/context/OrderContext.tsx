import { useEffect, useState, type ReactNode } from "react";
import { OrderContext, type Order } from "./OrderContextDefinition";

function getInitialOrders(): Order[] {
  if (typeof window === "undefined") {
    return [];
  }

  const savedOrders = localStorage.getItem("vanta-orders");

  if (!savedOrders) {
    return [];
  }

  try {
    const parsedOrders = JSON.parse(savedOrders);

    if (!Array.isArray(parsedOrders)) {
      return [];
    }

    return parsedOrders;
  } catch {
    return [];
  }
}

function generateOrderId() {
  const randomNumber = Math.floor(10000 + Math.random() * 90000);

  return `VNT-${randomNumber}`;
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(getInitialOrders);

  useEffect(() => {
    localStorage.setItem("vanta-orders", JSON.stringify(orders));
  }, [orders]);

  function createOrder(orderData: Omit<Order, "id" | "createdAt">) {
    const newOrder: Order = {
      ...orderData,
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
    };

    setOrders((currentOrders) => [newOrder, ...currentOrders]);

    return newOrder;
  }

  function getOrderById(orderId: string) {
    return orders.find((order) => order.id === orderId);
  }

  function getUserOrders(userId: number) {
    return orders.filter((order) => order.userId === userId);
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
        getUserOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
