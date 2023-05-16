import Button from "react-bootstrap/Button";
import { BsFillBasket3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export function CartLink() {
  const navigate = useNavigate();

  function handleRouteToCart() {
    navigate("/checkout");
  }

  return (
    <Button
      data-cy="cart-link"
      variant="outline-primary"
      onClick={handleRouteToCart}
      style={{
        width: "3rem",
        height: "3rem",
        position: "relative",
        color: "white",
        marginLeft: "3rem",
      }}
      className="rounded-circle"
    >
      <BsFillBasket3Fill />
    </Button>
  );
}
