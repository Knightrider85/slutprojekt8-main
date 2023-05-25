import { useFormik } from "formik";
import { ChangeEvent, useContext } from "react";
import { Button, FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { ProductContext, ProductData, useProducts } from "../contexts/ProductContext";


export function NewProductForm() {
  const { addProduct, getAllProducts, uploadImage, editProduct } = useProducts();

  const navigate = useNavigate();
  const { products: items } = useContext(ProductContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      Color:"",
      imageId:'',
      price: 0,
      description: "",
      stock: 0,
      categories: [""],
      id: "",
    },
    validationSchema: Yup.object({
      imageId: Yup.string().required("Please enter a URL"),
      title: Yup.string().required("Please enter a title"),
      description: Yup.string().required("Please enter a description"),
      price: Yup.number().moreThan(0)
        .typeError("Please enter a number")
        .required("Please enter a price"),
      stock: Yup.number().moreThan(0).typeError("Please enter a number")
      .required("Please enter a quantity"),
      categories: Yup.string().required("Please enter a category")
    }),
    onSubmit: (values) => {
        let product: ProductData = {
        id: values.id,
        name: values.name,
        imageId: values.imageId,
        price: values.price,
        description: values.description,
        stock: values.stock,
        categories: values.categories,
        quantity: values.stock
      };
      
      formik.resetForm();

      if (editProduct) {
        editProduct(product);
      } else {
        addProduct(product);
      }

    },
  });

  async function createNewProdcut(product: ProductData) {
    const newProduct = addProduct(product);
    getAllProducts();
  }

  async function handleUploadImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageId = await uploadImage(file);
        formik.setFieldValue("imageId", imageId);
      } catch (error) {
        if (error instanceof Error) {
          formik.setFieldError("imageId", error.message);
        }
      }
    }
  }

  return (
    <>
      <Form noValidate onSubmit={formik.handleSubmit} data-cy="product-form">
        <FloatingLabel controlId="image" label="Image URL" className="mb-3">
          <Form.Control
            type="file"
            // placeholder="https://example.jpg"
            name="image"
            // value={formik.values.imageId}
            onChange={handleUploadImage}
            // onBlur={formik.handleBlur}
            data-cy="product-image"
            isInvalid={formik.touched.imageId && !!formik.errors.imageId}
          />
          {formik.touched.imageId && formik.errors.imageId && (
            <Form.Control.Feedback
              type="invalid"
              data-cy="product-image-error"
            >
              {formik.errors.imageId}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>

        <FloatingLabel controlId="title" label="Product title" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Example"
            name="title"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            data-cy="product-title"
            isInvalid={formik.touched.name && !!formik.errors.name}
          />
          {formik.touched.name && formik.errors.name && (
            <Form.Control.Feedback
              type="invalid"
              data-cy="product-name-error"
            >
              {formik.errors.name}
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

        <FloatingLabel controlId="stock" label="Amount in Stock">
          <Form.Control
            style={{ marginTop: '1rem'}}
            type="text"
            placeholder="Set how many in stock"
            name="stock"
            value={formik.values.stock}
            onChange={(e) => formik.setFieldValue("stock", Number(e.target.value))}
            onBlur={formik.handleBlur}
            data-cy="product-stock"
            isInvalid={formik.touched.stock && !!formik.errors.stock}
          />
          {formik.touched.stock && formik.errors.stock && (
            <Form.Control.Feedback
              type="invalid"
              data-cy="product-stock-error"
            >
              {formik.errors.stock}
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
