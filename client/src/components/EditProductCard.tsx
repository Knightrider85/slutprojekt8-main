import { useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Product } from "../../data";
import { useProducts } from "../contexts/ProductContext";

interface EditProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export function EditProductCard({ product, onEdit }: EditProductCardProps) {
  const { removeProduct } = useProducts();
  const handleEditProduct = () => {
    onEdit(product);
  };

  const handleDeleteProduct = () => {
    removeProduct(product.id);
  };

  return (
    <StyledCard data-cy="product">
      <StyledCardImg variant="top" src={product.imageUrl} />
      <Card.Body
        className="card-body"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            marginBottom: "1rem",
          }}
        >
          <Card.Title data-cy="product-title">{product.name}</Card.Title>
          <Card.Text data-cy="product-price">
            Price: {product.price + " SEK"}
          </Card.Text>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="primary" onClick={handleEditProduct}>
            Edit Product
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Delete Product
          </Button>
        </div>
      </Card.Body>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  width: 22rem;
  margin-top: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
  }
`;

const StyledCardImg = styled(Card.Img)`
  width: 18rem;
  margin-left: 2rem;
  cursor: pointer;

  @media only screen and (max-width: 420px) {
    margin-left: 7px;
  }
`;
