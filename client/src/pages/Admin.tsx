import { useContext } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import StepUpProduct from "../components/StepUpProduct";
import StepUpAdmin from "../components/StepupAdmin";
import { ProductContext } from "../contexts/ProductContext";

export function Admin() {
  const navigate = useNavigate();

  const { products: items, setProducts: setItems } = useContext(ProductContext);

/*   useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setItems(JSON.parse(storedProducts));
    }
  }, []); */

  return (
    <Container>
      <StepUpAdmin />
      <StepUpProduct />
      {/* <AddBtnContainer>
        <Button
          variant="primary"
          onClick={() => navigate(`/admin/product/new`)}
          data-cy="admin-add-product"
        >
          Add new item
        </Button>
      </AddBtnContainer>
      <ListHeader>
        <Row>
          <Col xs={3}>Title</Col>
          <Col xs={4}>Description</Col>
          <Col>Price</Col>
          <Col>Id</Col>
        </Row>
      </ListHeader>
      <ListHeaderMediaQ>
        <Col>Listed products</Col>
      </ListHeaderMediaQ>
        <div>
          {items.map((product) => (
            <Row key={product.id} data-cy="product">
              <ProductListedItem
                product={product}
              />
            </Row>
          ))}
        </div> */}
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
