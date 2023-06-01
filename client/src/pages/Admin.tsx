import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import EditProduct from "../components/EditProduct";
import { NewProductForm } from "../components/NewProductForm";
import StepUpAdmin from "../components/StepupAdmin";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { useState } from "react";

export function Admin() {
  const navigate = useNavigate();
  const { products: items } = useContext(ProductContext);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(false);
  fetch("/api/checkAdmin")
    .then((response) => response.json())
    .then((data) => setIsAdmin(data.isAdmin))
    .catch((error) => console.error("Error checking admin:", error));

  return (
    <>
    {isAdmin && (
      <Container>
        <div style={{ marginBottom: "3rem" }} className="border-bottom mb-3 pb-3">
          <StepUpAdmin />
        </div>
        <NewProductForm />
        <EditProduct />
      </Container>
    )}
  </>
  );
}
