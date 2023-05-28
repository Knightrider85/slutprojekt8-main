import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsFillBasket3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Product } from "../../data";
import { CartContext } from "../contexts/cartContext";

export function CartButton() {
  const [showCart, setShowCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const { cartItems, totalCartCount, totalCost } = useContext(CartContext);
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const handleCartButtonClick = () => {
    if (isSignedIn) {
      handleShowCart();
    } else {
      handleShowModal();
    }
  };

  const handleSignIn = () => {
    // Perform sign-in logic here
    // Set isSignedIn flag to true if sign-in is successful
    navigate("/login");
    setIsSignedIn(true);
    handleCloseModal();
  };

  const handleCreateUser = () => {
    // Perform create user logic here
    // Set isSignedIn flag to true if user creation is successful
    // setIsSignedIn(true);
    navigate("/users");
    handleCloseModal();
  };

  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={handleCartButtonClick}
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
                  key={product.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "1rem",
                    width: "300px",
                    borderBottom: "1px solid black",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: "120px",
                      height: "100px",
                      objectFit: "cover",
                      marginRight: "1rem",
                    }}
                  />
                  <div>
                    <div>{product.title}</div>
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
            onClick={handleRouteToCart}
          >
            Checkout
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign In or Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please sign in or create a user to access the cart.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSignIn}>
            Sign In
          </Button>
          <Button variant="primary" onClick={handleCreateUser}>
            Create User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
