import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";

const SignInForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

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
        console.error("Error signing in user:", response.statusText);
      }
    } catch (error) {
      console.error("Error signing in user:", error);
    }
  };

  return (
    <div className="container">
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
            </div>
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
