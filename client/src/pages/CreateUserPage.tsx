import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TestUser from "../components/CreateUser";
import SignInUser from "../components/SignInUser";
import StepUpAdmin from "../components/StepupAdmin";

export function CreateUserPage() {
  const navigate = useNavigate();

  return (
    <>
      <h2 className="text-center mt-4">Create Your Step Up Account</h2>
      <Row className="justify-content-center mt-4">
        <Col md={6} className="mb-3">
          <TestUser />
        </Col>
        <Col md={6} className="mb-3 border border-dark">
          <SignInUser />
        </Col>
      </Row>
    </>
  );
}
