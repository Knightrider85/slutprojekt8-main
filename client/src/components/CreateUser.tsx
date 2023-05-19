import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import { useOrderContext } from "../contexts/OrderContext";

const schema = Yup.object().shape({
  name: Yup.string().required(),

  email: Yup.string().email("Invalid email address").required(),
});

export type OrderDetails = Yup.InferType<typeof schema>;

const initialValues: OrderDetails = {
  name: "",
  email: "",
};

export function CreateUser() {
  const navigate = useNavigate();

  const { setOrderDetails } = useOrderContext();
  return (
    <>
      <div
        style={{
          display: "flex",

          alignItems: "center",
        }}
      ></div>
      <StyledFormContainer className="d-flex justify-content-center align-items-center">
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            setOrderDetails(values);
            navigate("/");
          }}
          initialValues={initialValues}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form
              data-cy="customer-form"
              noValidate
              onSubmit={handleSubmit}
              autoComplete="on"
            >
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    data-cy="customer-name"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Name"
                    isValid={touched.name && !errors.name}
                    isInvalid={touched.name && !!errors.name}
                    autoComplete="name"
                  />
                  {touched.name && errors.name && (
                    <Form.Control.Feedback
                      type="invalid"
                      data-cy="customer-name-error"
                    >
                      {errors.name}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="validationFormik05">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    data-cy="customer-email"
                    type="text"
                    placeholder="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                    autoComplete="email"
                  />
                  {touched.email && errors.email && (
                    <Form.Control.Feedback
                      type="invalid"
                      data-cy="customer-email-error"
                    >
                      {errors.email}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Row>
              <Button style={{ marginTop: "1rem" }} type="submit">
                Create Account
              </Button>
            </Form>
          )}
        </Formik>
      </StyledFormContainer>
    </>
  );
}

const StyledFormContainer = styled.div`
  border: 1px solid #ffffff;
  background-color: #f5f5f5;
  padding: 3rem 2rem;

  @media (max-width: 768px) {
    height: 110vh;
  }
`;
export default CreateUser;
