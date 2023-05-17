import { useEffect, useState } from "react";
import styled from "styled-components";
import { Product } from "../../data/index";
import { ProductCard } from "../components/ProductCard";
import { ToastCart } from "../components/ToastCart";
import { useCart } from "../contexts/cartContext";
import { useProducts } from "../contexts/ProductContext";

export function Home() {
  const { cartItems } = useCart();
  const { products } = useProducts();
  const [showToast, setShowToast] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);

  useEffect(() => {
  const newProduct = cartItems[cartItems.length - 1];
     if (newProduct) {
       setLastAddedProduct(newProduct);
       setShowToast(true);
       setTimeout(() => setShowToast(false), 5000);
     }
   }, [cartItems]);

  return (
    <main>
      <div>
        <Heading>Welcome to StepUp</Heading>
      </div>
      {showToast && lastAddedProduct && (
        <ToastCart
          product={lastAddedProduct}
          showToast={showToast}
          setShowToast={setShowToast}
        />
      )}
      <ProductContainer>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductContainer>
    </main>
  );
}

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const Heading = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 3rem;
  text-align: center;
  color: #333;
  -webkit-text-stroke: 1px #fff;
`;

