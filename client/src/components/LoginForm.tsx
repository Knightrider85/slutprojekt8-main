import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import React from "react";
import { Container } from "react-bootstrap";
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

function LoginForm() {
  const [loginError, setLoginError] = React.useState<string>("");

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
      } else {
        setLoginError("Password is incorrect."); // Uppdatera felmeddelandet
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
          <FormikForm onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
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
              <label htmlFor="password" className="form-label">
                Password
              </label>
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
              {loginError && ( // Visa felmeddelande
                <div className="text-danger">{loginError}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </FormikForm>
        )}
      </Formik>
    </Container>
  );
}

export default LoginForm;
