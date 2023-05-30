import { useContext } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import StepUpAdmin from "../components/StepupAdmin";
import { ProductContext } from "../contexts/ProductContext";
import { NewProductForm } from "../components/NewProductForm";
import EditProduct from "../components/EditProduct";

export function Admin() {
  return (
    <Container>
      <StepUpAdmin />
      <NewProductForm />
      <EditProduct />
    </Container>
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
