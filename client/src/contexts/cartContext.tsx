import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { CartItem, Product } from "../../data";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CartContextValue {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (cartItem: CartItem) => void;
  removeFromCart: (cartItem: CartItem) => void;
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
  totalCost: number;
  totalCartCount: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  quantity: number;
}

export const CartContext = createContext({} as CartContextValue);
export function useCart() {
  return useContext(CartContext);
}

export default function CartProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart", []);
  const [showToast, setShowToast] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const totalCartCount = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  // calculate total quantity

  // calculate total cost
  // calculate total cost
  const totalCost = cartItems.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const addToCart = (cartItem: CartItem) => {
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === cartItem.id
    );

    if (existingProductIndex >= 0) {
      const updatedCartItems = [...cartItems];
      // increase the quantity of the existing product
      updatedCartItems[existingProductIndex] = {
        ...updatedCartItems[existingProductIndex],
        quantity:
          updatedCartItems[existingProductIndex].quantity + cartItem.quantity,
      };
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, cartItem]);
    }
    setShowToast(true);
  };

  const removeFromCart = (cartItem: CartItem) => {
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === cartItem.id
    );
  
    if (existingProductIndex >= 0) {
      const updatedCartItems = [...cartItems];
      // decrease the quantity of the existing product by 1
      updatedCartItems[existingProductIndex] = {
        ...updatedCartItems[existingProductIndex],
        quantity: updatedCartItems[existingProductIndex].quantity - 1,
      };
  
      if (updatedCartItems[existingProductIndex].quantity === 0) {
        // remove the item if the quantity becomes 0
        updatedCartItems.splice(existingProductIndex, 1);
      }
  
      setCartItems(updatedCartItems);
      setShowToast(true);
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      showToast,
      setShowToast,
      totalCost,
      totalCartCount,
      quantity,
      setQuantity,
    }}>
      {children}
    </CartContext.Provider>
  );
}
