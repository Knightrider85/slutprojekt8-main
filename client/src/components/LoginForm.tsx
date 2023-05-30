import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export function LoginForm() {
  const [loginError, setLoginError] = useState<string>("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    console.log("Form values:", values); // Log form values

    try {
      const response = await fetch("/api/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log("User signed in successfully");
        resetForm();
        window.location.href = "/";
        setIsSignedIn(true) 
        localStorage.setItem('isSignedIn', JSON.stringify(isSignedIn));
      } else {
        setLoginError("Password is incorrect.");
      }
    } catch (error) {
      console.error("Error signing in user:", error);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center vh-60">
      <h2>Sign In</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form as={FormikForm} onSubmit={handleSubmit}>
            <div className="mb-3">
              <Form.Label>Email</Form.Label>
              <Field
                type="email"
                id="email"
                name="email"
                className="form-control"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <Form.Label>Password</Form.Label>
              <Field
                type="password"
                id="password"
                name="password"
                className="form-control"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
              {loginError && <Alert variant="danger">{loginError}</Alert>}
            </div>
            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export let isSignedIn = true;
export const setIsSignedIn = (isSignedIn:Boolean) => {}; //
export default LoginForm;
