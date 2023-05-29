import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useOrderContext } from "../contexts/OrderContext";

export function ConfirmationPage() {
  const navigate = useNavigate();
  const { orderNumber, orderDetails } = useOrderContext();

  return (
    <ConfirmationContainer>
      <h1>Thank you for your purchase!</h1>
      <p>Here are your order details:</p>
      <div
        style={{
          border: "1px solid black",
          borderRadius: "5px",
          marginBottom: "1rem",
          padding: "1rem",
        }}
      >
        <div>{orderDetails.item}</div>
        <div style={{ fontWeight: "bold", margin: "2rem 0" }}>
          {"Total cost: " + orderDetails.totalCost + " kr"}
        </div>
        <p>
          <span style={{ fontWeight: "bold" }}>Name: </span>
          {orderDetails.name}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Email: </span>
          {orderDetails.email}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Phone: </span>
          {orderDetails.phone}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Address: </span>
          {orderDetails.address}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>City: </span>
          {orderDetails.city}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Zip: </span>
          {orderDetails.zip}
        </p>
        <br />
        <p>
          <span style={{ fontWeight: "bold" }}>Order number: </span>
          {orderNumber}
        </p>
      </div>
      <Button
        variant="primary"
        onClick={() => {
          navigate("/");
        }}
      >
        Return to Home
      </Button>
    </ConfirmationContainer>
  );
}

const ConfirmationContainer = styled.div`
  margin: 10px 1rem;
`;
