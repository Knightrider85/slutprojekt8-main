import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsFillBasket3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Product } from "../../data";
import { CartContext } from "../contexts/cartContext";

export function CartButton() {
  const [showCart, setShowCart] = useState(false);
  const handleCloseCart = () => setShowCart(false);
  const { cartItems, totalCartCount, totalCost } = useContext(CartContext);
  const navigate = useNavigate();
  

  const handleButtonClick = () => {
    navigate("/checkout");
    
     {
      
     }
    
  };
  return (
    <>
      <Button
  variant="outline-secondary"
  onClick={handleButtonClick}
  style={{
    width: "3rem",
    height: "3rem",
    position: "relative",
    color: "black",
  }}
  className="rounded-circle"
>


        <BsFillBasket3Fill />

        <div
          data-cy="cart-items-count-badge"
          style={{
            position: "absolute",
            bottom: "-5px",
            right: "-5px",
            backgroundColor: "blue",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "12px",
            color: "white",
          }}
        >
          {totalCartCount}
        </div>
      </Button>
      <Offcanvas show={showCart} onHide={handleCloseCart} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
            backgroundColor: "#f8f9fa",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            {cartItems.length > 0 ? (
              cartItems.map((product: Product) => (
                <div
                  key={product._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "1rem",
                    width: "300px",
                    borderBottom: "1px solid black",
                  }}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      width: "120px",
                      height: "100px",
                      objectFit: "cover",
                      marginRight: "1rem",
                    }}
                  />
                  <div>
                    <div>{product.name}</div>
                    <div>{product.price} kr</div>
                    <div>{product.size}</div>
                  </div>
                </div>
              ))
            ) : (
              <div>Your cart is empty</div>
            )}
          </div>
          <div data-cy="total-price">Total cost: {totalCost} kr</div>
          <Button
            data-cy="cart-link"
            variant="primary"
            style={{ marginTop: "2rem" }}
            onClick={handleButtonClick}
          >
            Checkout
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
