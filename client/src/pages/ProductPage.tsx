import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CartItem, Product } from "../../data";
import { FilterSelect } from "../components/FilterSelect";
import { ToastCart } from "../components/ToastCart";
import { useProducts } from "../contexts/ProductContext";
import { CartContext, useCart } from "../contexts/cartContext";

export function ProductPage() {
  const params = useParams();
  const { products } = useProducts();
  const product = products.find((product) => product._id === params.productid);
  const { addToCart } = useContext(CartContext); //here is where the context is beeing used//dv
  const sizes = ["37", "38", "39", "40", "41", "42", "43", "44", "45", "46"];
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(
    null
  );
  const { cartItems } = useCart();

  useEffect(() => {
    const newProduct = cartItems[cartItems.length - 1];
    if (newProduct) {
      setLastAddedProduct(newProduct);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }
  }, [cartItems]);

  // const {addToCart} = useContext(CartContext); vårt test
  if (!product) {
    return <div>404 not found</div>;
  }

  const handleAddToCart = () => {
    const cartItem: CartItem = { ...product, size: selectedSize, quantity };
    addToCart(cartItem);
    setQuantity(1);
    setSelectedSize(sizes[0]);
  };

  return (
    <div>
      <Card>
        <Container className="mb-5 mt-5">
          <Row>
            <Col lg={6}>
              <ProductImage
                src={"/api/file/" + product.imageId}
                alt={product.name}
              />
            </Col>
            <Col lg={6}>
              <ContentDetails>
                <Title data-cy="product-title">{product.name}</Title>
                <Description data-cy="product-description">
                  {product.description}
                </Description>
                <Styledp data-cy="product-price">
                  Price: {product.price} SEK
                </Styledp>
                <div>
                  <FilterSelect
                    filter={sizes}
                    selectedOption={selectedSize}
                    setSelectedOption={setSelectedSize}
                  />
                </div>
                <AddToCartButton
                  data-cy="product-buy-button"
                  variant="primary"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </AddToCartButton>
              </ContentDetails>
            </Col>
          </Row>
        </Container>
      </Card>

      {showToast && lastAddedProduct && (
        <ToastCart
          product={lastAddedProduct}
          showToast={showToast}
          setShowToast={setShowToast}
        />
      )}
    </div>
  );
}

const ProductImage = styled.img`
  width: 100%;
  max-width: 490px;
  height: auto;
`;

const Styledp = styled.p`
  font-weight: bold;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 10px 1.3rem;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 100%;
  max-width: 490px;
  object-fit: cover;
`;

const ContentDetails = styled.div`
  flex: 1;
  margin-left: 20px;

  @media (max-width: 420px) {
    margin-left: 5px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Description = styled.p`
  font-size: 16px;
`;

const AddToCartButton = styled(Button)`
  margin-top: 20px;
`;
