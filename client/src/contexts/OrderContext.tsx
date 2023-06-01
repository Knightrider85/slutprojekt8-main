import { createContext, PropsWithChildren, useContext, useState } from "react";
import { OrderDetails } from "../components/OrderForm";
import {
  useCart,
  CartContextValue,
  CartContext,
} from "../contexts/cartContext";
import { useProducts } from "./ProductContext";

interface OrderContextType {
  orderId: number;
  orderDetails: OrderDetails & { products: any[] };
  setOrderDetails: (values: Partial<OrderDetails>) => void;
  addOrder: (
    order: Partial<
      OrderDetails & { products: any[]; totalCost: number; quantity: number[] }
    >
  ) => Promise<void>;
  cartItems: CartContextValue["cartItems"];
  setCartItems: CartContextValue["setCartItems"];
  totalCost: CartContextValue["totalCost"];
  orderNumber: number;
}

const OrderContext = createContext({} as OrderContextType);

export function useOrderContext() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }: PropsWithChildren) {
  const { editProduct } = useProducts();
  const { cartItems, setCartItems, totalCost: cartTotalCost } = useCart();
  const [orderNumber, setOrderNumber] = useState<number>(0);
  const [orderDetails, updateOrderDetails] = useState<
    OrderDetails & { products: any[]; quantity: number }
  >({
    name: "",
    address: "",
    city: "",
    zip: "",
    email: "",
    phone: "",
    products: [],
    quantity: 0,
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

  const addOrder = async (
    order: Partial<
      OrderDetails & { products: any[]; totalCost: number; quantity: number[] }
    >
  ) => {
    try {
      const { name, address, city, zip, email, phone } = order;
      const { products, totalCost, quantity } = order;

      const calculatedQuantity = products
        ? products.reduce((acc, product) => acc + product.quantity, 0)
        : cartItems.reduce((acc, item) => acc + item.quantity, 0);

      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: products || cartItems,
          totalCost: totalCost || cartTotalCost,
          quantity: quantity || calculatedQuantity,
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

        if (products) {
          products.forEach((product) => {
            const updatedProduct = {
              ...product,
              stock: product.stock - product.quantity,
            };
            editProduct(updatedProduct);
          });
        }
      } else {
        console.error("Failed to submit order");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
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
        orderNumber,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
