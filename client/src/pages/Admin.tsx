import { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import EditProduct from "../components/EditProduct";
import { NewProductForm } from "../components/NewProductForm";
import StepUpAdmin from "../components/StepupAdmin";
import { ProductContext } from "../contexts/ProductContext";

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
          <StepUpAdmin />
          <NewProductForm />
          <EditProduct />
        </Container>
      )}
    </>
  );
}

const AddBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 1rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const ListHeader = styled.div`
  font-weight: bold;
  padding: 1rem;
  border: 1px solid orange;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ListHeaderMediaQ = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    font-weight: bold;
    padding: 1rem;
    border: 1px solid orange;
  }
`;
