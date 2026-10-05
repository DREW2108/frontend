import { useContext } from "react";
import { OrderContext } from "./OrderContextDefinition";

export function useOrders() {
    const context = useContext(OrderContext);

    if (context === undefined) {
        throw new Error(
            "useOrders debe utilizarse dentro de OrderProvider"
        );
    }

    return context;
}