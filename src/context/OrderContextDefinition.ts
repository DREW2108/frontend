import { createContext } from "react";
import type { CartItem } from "./CartContextDefinition";

export type OrderItem = CartItem;

export interface Order {
    id: string;
    userId: number;
    customerName: string;
    customerEmail: string;
    phone: string;
    address: string;
    city: string;
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    total: number;
    status: "received" | "processing" | "shipped" | "delivered";
    createdAt: string;
}

export interface OrderContextType {
    orders: Order[];
    createOrder: (order: Omit<Order, "id" | "createdAt">) => Order;
    getOrderById: (orderId: string) => Order | undefined;
    getUserOrders: (userId: number) => Order[];
}

export const OrderContext = createContext<
    OrderContextType | undefined
>(undefined);