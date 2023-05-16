import { useFormik } from "formik";
import { useContext } from "react";
import { Button, FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { generateId, Product } from "../../data";
import { ProductContext } from "../contexts/ProductContext";

export function NewProductForm() {
  const navigate = useNavigate();
  const { products: items, setProducts: setItems } = useContext(ProductContext);

  const formik = useFormik<Product>({
    initialValues: {
      image: "",
      title: "",
      description: "",
      price: "" as any,
      id: "",
    },
    validationSchema: Yup.object({
      image: Yup.string()
        .url("Please enter a valid URL")
        .required("Please enter a URL"),
      title: Yup.string().required("Please enter a title"),
      description: Yup.string().required("Please enter a description"),
      price: Yup.number().moreThan(0)
        .typeError("Please enter a number")
        .required("Please enter a price"),
    }),
    onSubmit: (values, { resetForm }) => {
      const id = generateId();
      const newProduct = { ...values, id };
      updateLocalStorage(newProduct);
      resetForm();
      navigate("/admin");
    },
  });

  const updateLocalStorage = (newProduct: Product) => {
    const updatedProducts = structuredClone(items);
    updatedProducts.push(newProduct);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setItems(updatedProducts);
  };

  return (
    <>
      <Form noValidate onSubmit={formik.handleSubmit} data-cy="product-form">
        <FloatingLabel controlId="image" label="Image URL" className="mb-3">
          <Form.Control
            type="text"
            placeholder="https://example.jpg"
            name="image"
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            data-cy="product-image"
            isInvalid={formik.touched.image && !!formik.errors.image}
          />
          {formik.touched.image && formik.errors.image && (
            <Form.Control.Feedback
              type="invalid"
              data-cy="product-image-error"
            >
              {formik.errors.image}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>

        <FloatingLabel controlId="title" label="Product title" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Example"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            data-cy="product-title"
            isInvalid={formik.touched.title && !!formik.errors.title}
          />
          {formik.touched.title && formik.errors.title && (
            <Form.Control.Feedback
              type="invalid"
              data-cy="product-title-error"
            >
              {formik.errors.title}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>

        <FloatingLabel controlId="description" label="Product description">
          <Form.Control
            type="text"
            placeholder="Write a description of the product"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            data-cy="product-description"
            isInvalid={
              formik.touched.description && !!formik.errors.description
            }
          />
          {formik.touched.description && formik.errors.description && (
            <Form.Control.Feedback
              type="invalid"
              data-cy="product-description-error"
            >
              {formik.errors.description}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>

        <FloatingLabel controlId="price" label="Product price">
          <Form.Control
            style={{ marginTop: '1rem'}}
            type="text"
            placeholder="Set a price for the product"
            name="price"
            value={formik.values.price}
            onChange={(e) => formik.setFieldValue("price", Number(e.target.value))}
            onBlur={formik.handleBlur}
            data-cy="product-price"
            isInvalid={formik.touched.price && !!formik.errors.price}
          />
          {formik.touched.price && formik.errors.price && (
            <Form.Control.Feedback
              type="invalid"
              data-cy="product-price-error"
            >
              {formik.errors.price}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>

        <Button type="submit" style={{ marginTop: '1rem'}}>Create product</Button>
      </Form>
    </>
  );
}
