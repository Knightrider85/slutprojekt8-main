import { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { Product } from "../../data/index";
import { ProductCard } from "../components/ProductCard";
import { ToastCart } from "../components/ToastCart";
import { useProducts } from "../contexts/ProductContext";
import FilterList from "../components/FilterList";
import { useCart } from "../contexts/cartContext";

export function Home() {
  const { cartItems } = useCart();
  const { products, filters } = useProducts();
  const [showToast, setShowToast] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(
    null
  );

  const sortedAndFilteredProducts = useMemo(() => {
    let filteredProducts = products;

    if (filters.category !== "None") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.color !== "None") {
      filteredProducts = filteredProducts.filter(
        (product) => product.color === filters.color
      );
    }

    if (filters.price === "Highest to Lowest") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (filters.price === "Lowest to Highest") {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    return filteredProducts;
  }, [products, filters]);

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
        <FilterList />
      </div>
      {showToast && lastAddedProduct && (
        <ToastCart
          product={lastAddedProduct}
          showToast={showToast}
          setShowToast={setShowToast}
        />
      )}
      <ProductContainer>
        {sortedAndFilteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
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
