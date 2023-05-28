import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsFillBasket3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
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

  // BÖRJAN TILL KOD FÖR ATT SE OM ANVÄNDARE ÄR INLOGGAD ELLER INTE, VERKAR DOCK INTE FUNGERA

  useEffect(() => {
    const isAuthenticated: boolean = checkIfUserIsAuthenticated(); // Implement your own authentication check logic here

    if (isAuthenticated) {
      handleCloseModal();
    }
  }, []);

  function handleCartButtonClick() {
    const isAuthenticated: boolean = checkIfUserIsAuthenticated(); // Implement your own authentication check logic here

    if (isAuthenticated) {
      handleShowCart();
    } else {
      handleShowModal();
    }
  }

  function checkIfUserIsAuthenticated() {
    // Implement your own authentication check logic here
    // For example, you can check if there is a user token or session available
    // Return true if user is authenticated, false otherwise

    // Example implementation:
    const userToken = localStorage.getItem("userToken"); // Assuming you store the user token in local storage

    return !!userToken; // Convert truthy/falsy value to boolean
  }

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
          {/* Cart content */}
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
          <Button
            variant="primary"
            onClick={() => {
              navigate("/login");
              handleCloseModal();
            }}
          >
            Sign In
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/users");
              handleCloseModal();
            }}
          >
            Create User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
