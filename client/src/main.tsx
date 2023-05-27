import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CartProvider from "./contexts/cartContext";
import { OrderProvider } from "./contexts/OrderContext";
import { ProductProvider } from "./contexts/ProductContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ProductProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </ProductProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
