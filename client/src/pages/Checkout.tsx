import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { isSignedIn } from "../components/LoginForm";
import { OrderForm } from "../components/OrderForm";
import { useCart } from "../contexts/cartContext";
export function CartPage() {
  const { cartItems, totalCost, addToCart, removeFromCart} = useCart();
  
  const navigate = useNavigate();
function signIn(){
  navigate("/login")
}

  function checkLoginStatus() {
    if (isSignedIn === true) {
      
      return <p>User is logged in</p>; 
    } else {
      
      return <Button>Logga in</Button>; 
    }
  }
  return (
    <CartContainer>
      <ProductsContainer>
        {cartItems.length > 0 ? (
          cartItems.map((product) => (
            <ProductItem data-cy="cart-item" key={product.id}>
              <ProductImage src={product.imageUrl} alt={product.name} />
              <ProductDetails>
                <ProductTitle data-cy="product-title">
                  {product.name}
                </ProductTitle>
                <ProductPrice data-cy="product-price">
                  {product.price * product.quantity} kr
                </ProductPrice>
                <ProductSize>{product.size}</ProductSize>
                <ProductQuantity>
                  <Button
                    data-cy="decrease-quantity-button"
                    variant="outline-secondary"
                    onClick={() => {
                      removeFromCart({...product})
                    }}
                    style={{ marginRight: "1rem" }}
                  >
                    {" "}
                    -
                  </Button>
                  <InputField
                   data-cy="product-quantity"
                    type="number"
                    value={product.quantity}
                  />

                  <Button
                    data-cy="increase-quantity-button"
                    variant="outline-secondary"
                    onClick={() => {
                    addToCart({...product, quantity: 1})
                    }}
                    style={{ marginLeft: "1rem" }}
                  >
                    +
                    
                  </Button>
                  
                </ProductQuantity>
              </ProductDetails>
            </ProductItem>
            
          ))
        ) : (
          <div>Your cart is empty</div>
          
        )}
      </ProductsContainer>
      <TotalPrice data-cy="total-price">Total cost: {totalCost} kr</TotalPrice>
      <OrderForm />
      <button onClick={() => { checkLoginStatus(); signIn(); }}>Sign in</button>
    </CartContainer>
  );
}


const InputField = styled.input`
width: 100%;
max-width: 50px;
text-align: center;
height: 38px;
`
const ProductQuantity = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
`;
const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: #f8f9fa;

  @media (max-width: 520px) {
    padding: 1rem;
  }
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;

  @media (max-width: 520px) {
    margin-top: 0.5rem;
  }
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
  width: 100%;
  border-bottom: 1px solid black;

  @media (max-width: 520px) {
    margin: 0.5rem;
  }
`;

const ProductImage = styled.img`
  width: 120px;
  height: 100px;
  object-fit: cover;
  margin-right: 1rem;

  @media (max-width: 520px) {
    width: 80px;
    height: 60px;
    margin-right: 0.5rem;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;

  @media (max-width: 520px) {
    font-size: 0.8rem;
  }
`;

const ProductPrice = styled.div`
  font-size: 1.2rem;
  margin-top: 0.5rem;

  @media (max-width: 520px) {
    font-size: 0.8rem;
  }
`;

const ProductSize = styled.div`
  font-size: 1.2rem;
  margin-top: 0.5rem;

  @media (max-width: 520px) {
    font-size: 0.8rem;
  }
`;

const TotalPrice = styled.div`
  margin-bottom: 4rem;

  @media (max-width: 520px) {
    margin-bottom: 2rem;
  }
`;
