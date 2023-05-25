import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreateUser from "../components/CreateUser";

export function CreateUserPage() {
  const navigate = useNavigate();

  return (
    <>
      <h2 className="text-center mt-4">Create Your Step Up Account</h2>
      <Row className="justify-content-center mt-4">
        <Col md={6} className="mb-3">
          <CreateUser />
        </Col>
      </Row>
    </>
  );
}
