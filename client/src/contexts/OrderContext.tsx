import { createContext, PropsWithChildren, useContext, useState } from "react";
import { OrderDetails } from "../components/OrderForm";
import { useCart } from "./cartContext";

interface OrderContextType {
  orderNumber: number;
  orderDetails: OrderDetails;
  setOrderDetails: (values: Partial<OrderDetails>) => void;
  addOrder: (order: Partial<OrderDetails>) => Promise<void>;
}

const OrderContext = createContext({} as OrderContextType);

export function useOrderContext() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }: PropsWithChildren) {
  const { cartItems, setCartItems, totalCost } = useCart();

  const [orderNumber, setOrderNumber] = useState(0);
  const [orderDetails, updateOrderDetails] = useState<OrderDetails>({
    name: "",
    address: "",
    city: "",
    zip: "",
    email: "",
    phone: "",
  });

  const getOrderNumber = () => {
    setOrderNumber(Math.floor(Math.random() * (1000000000 - 10000) + 10));
  };

  const setOrderDetails = (values: Partial<OrderDetails>) => {
    const item = cartItems.map((cartItem) => (
      <div style={{ padding: "1rem" }}>
        <img src={cartItem.imageUrl} style={{ width: "5rem" }} />
        <div>{cartItem.name}</div>
        <div>{cartItem.price + " kr"}</div>
      </div>
    ));

    getOrderNumber();
    updateOrderDetails((prevOrderDetails) => ({
      ...prevOrderDetails,
      ...values,
      item,
      totalCost,
    }));
    setCartItems([]);
  };

  const addOrder = async (order: Partial<OrderDetails>) => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        console.log("Order submitted successfully");
        const data = await response.json();
        console.log("Order ID:", data.orderId);
      } else {
        console.error("Failed to submit order");
        // Handle error and display an error message to the user
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      // Handle error and display an error message to the user
    }
  };

  return (
    <OrderContext.Provider
      value={{ orderNumber, orderDetails, setOrderDetails, addOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}
