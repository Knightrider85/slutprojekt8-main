import { useEffect, useState } from "react";
import styled from "styled-components";
import { Product } from "../../data/index";
import { ProductCard } from "../components/ProductCard";
import StepUpAdmin from "../components/StepupAdmin";
import { ToastCart } from "../components/ToastCart";
import { useProducts } from "../contexts/ProductContext";
import FilterList from "../components/FilterList";
import { useCart } from "../contexts/cartContext";

export function Home() {
  const { cartItems } = useCart();
  const { products } = useProducts();
  const [showToast, setShowToast] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);
  const sizes = ["Small", "Medium", "Large"];
  const [selectedSize, setSelectedSize] = useState("");
  const colors = ["Red", "Blue", "Green"];
  const brands = ['Adidas', 'Nike', 'Puma' ]

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
        <FilterList
          sizes={sizes}
          SelectedOption={selectedSize}
          setSelectedOption={setSelectedSize}
          colors={colors}
          brands={brands}
          label="Filterar efter"
          />

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

