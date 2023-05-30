import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import { useOrderContext } from "../contexts/OrderContext";
import { useCart } from "../contexts/cartContext";

const schema = Yup.object().shape({
  name: Yup.string().trim().min(1).required("Name is required"),
  address: Yup.string().required(),
  city: Yup.string().required(),
  zip: Yup.string()
    .required()
    .matches(/^[0-9]{5}$/, "Zipcode number must be exactly 5 digits"),
  email: Yup.string().email("Invalid email address").required(),
  phone: Yup.string()
    .required()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
});

export type OrderDetails = Yup.InferType<typeof schema>;

const initialValues: OrderDetails = {
  name: "",
  address: "",
  city: "",
  zip: "",
  email: "",
  phone: "",
};

export const OrderForm = () => {
  const navigate = useNavigate();
  const { setOrderDetails, addOrder,} = useOrderContext();
  const { cartItems, totalCost } = useCart();

  

  const handleSubmit = async (values: OrderDetails, { setSubmitting, resetForm }: any) => {
    try {
      const orderDetails = {
        name: values.name,
        address: values.address,
        city: values.city,
        zip: values.zip,
        email: values.email,
        phone: values.phone,
        products: cartItems,
        totalCost: totalCost,
      };
  
      setOrderDetails(orderDetails);
      await addOrder(orderDetails);
      setSubmitting(false);
      resetForm(); // Reset form values
      navigate("/confirmation", { state: { orderDetails } });    } catch (error) {
      console.error("Error submitting order:", error);
      // Handle error and display an error message to the user
    }
  };
  


  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Order Details</h2>
      </div>
      <StyledFormContainer className="d-flex justify-content-center align-items-center">
        <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
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
                <Form.Group as={Col} md="4" controlId="validationFormik03">
                  <Form.Label>Adress</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      data-cy="customer-address"
                      type="text"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      placeholder="Adress"
                      isValid={touched.address && !errors.address}
                      isInvalid={touched.address && !!errors.address}
                      autoComplete="street-address"
                    />
                    {touched.address && errors.address && (
                      <Form.Control.Feedback
                        type="invalid"
                        data-cy="customer-address-error"
                      >
                        {errors.address}
                      </Form.Control.Feedback>
                    )}
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationFormik04">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    data-cy="customer-city"
                    type="text"
                    placeholder="City"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    isInvalid={touched.city && !!errors.city}
                    autoComplete="address-level2"
                  />
                  {touched.city && errors.city && (
                    <Form.Control.Feedback
                      type="invalid"
                      data-cy="customer-city-error"
                    >
                      {errors.city}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationFormik07">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    data-cy="customer-zipcode"
                    type="text"
                    placeholder="Zip"
                    name="zip"
                    value={values.zip}
                    onChange={handleChange}
                    isInvalid={touched.zip && !!errors.zip}
                    autoComplete="postal-code"
                  />
                  {touched.zip && errors.zip && (
                    <Form.Control.Feedback
                      type="invalid"
                      data-cy="customer-zipcode-error"
                    >
                      {errors.zip}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
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
                <Form.Group as={Col} md="3" controlId="validationFormik06">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    data-cy="customer-phone"
                    type="text"
                    placeholder="phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    isInvalid={touched.phone && !!errors.phone}
                    autoComplete="tel"
                  />
                  {touched.phone && errors.phone && (
                    <Form.Control.Feedback
                      type="invalid"
                      data-cy="customer-phone-error"
                    >
                      {errors.phone}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Row>
              <Button style={{ marginTop: "1rem" }} type="submit">
                Submit order and pay
              </Button>
            </Form>
          )}
        </Formik>
      </StyledFormContainer>
    </>
  );
};

const StyledFormContainer = styled.div`
  border-radius: 10px;
  border: 1px solid #000;
  background-color: lightgray;
  padding: 3rem 1rem;

  @media (max-width: 768px) {
    height: 110vh;
  }
`;
