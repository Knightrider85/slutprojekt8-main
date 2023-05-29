import { createContext, PropsWithChildren, useContext, useState } from "react";
import { OrderDetails } from "../components/OrderForm";
import { useCart, CartContextValue, CartContext, } from "../contexts/cartContext";


interface OrderContextType extends CartContextValue {
  orderId: number;
  orderDetails: OrderDetails;
  setOrderDetails: (values: Partial<OrderDetails>) => void;
  addOrder: (order: Partial<OrderDetails & { products: any[]; totalCost: number }>) => Promise<void>;
}

const OrderContext = createContext({} as OrderContextType);

export function useOrderContext() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }: PropsWithChildren) {
  const { cartItems, setCartItems, totalCost: cartTotalCost } = useCart();
  const [orderNumber, setOrderNumber] = useState<number>(0);
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
    getOrderNumber();
    updateOrderDetails((prevOrderDetails) => ({
      ...prevOrderDetails,
      ...values,
    }));
    setCartItems([]);
  };

  const addOrder = async (order: Partial<OrderDetails & { products: any[]; totalCost: number }>) => {
    try {
      const { name, address, city, zip, email, phone } = orderDetails;
      const { products, totalCost } = order;

      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: products || cartItems, // Use products from the order parameter if provided, otherwise use cartItems from the CartContext
          totalCost: totalCost || cartTotalCost, // Use totalCost from the order parameter if provided, otherwise use cartTotalCost from the CartContext
          name,
          address,
          city,
          zip,
          email,
          phone,
        }),
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
      value={{
        orderId: orderNumber,
        orderDetails,
        setOrderDetails,
        addOrder,
        cartItems,
        setCartItems,
        totalCost: cartTotalCost,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
