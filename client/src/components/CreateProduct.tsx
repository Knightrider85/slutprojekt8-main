import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";

const CreateProductForm = () => {
  const initialValues = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categories: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    stock: Yup.number().required("Stock is required"),
    categories: Yup.string().required("categories is required")
  });

  const handleSubmit = async (values: any, { resetForm }: any) => {
    console.log("Form values:", values); // Log form values

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log("Product created successfully");
        resetForm();
        // Perform any necessary actions after creating the product
      } else {
        console.error("Error creating product:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="container">
      <h2>Create Product</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <FormikForm onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="form-control"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <Field
                type="text"
                id="description"
                name="description"
                className="form-control"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <Field
                type="number"
                id="price"
                name="price"
                className="form-control"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stock" className="form-label">
                Stock
              </label>
              <Field
                type="number"
                id="stock"
                name="stock"
                className="form-control"
              />
              <ErrorMessage
                name="stock"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="categories" className="form-label">
                Categories
              </label>
              <Field
                type="text"
                id="categories"
                name="categories"
                className="form-control"
              />
              <ErrorMessage
                name="categories"
                component="div"
                className="text-danger"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default CreateProductForm;
