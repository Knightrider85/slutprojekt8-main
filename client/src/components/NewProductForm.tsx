import { useFormik } from "formik";
import { useContext } from "react";
import { Button, FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";

import {
  ProductContext,
  ProductData,
  useProducts,
} from "../contexts/ProductContext";

export function NewProductForm() {
  const { addProduct, getAllProducts, /* uploadImage, */ editProduct } =
    useProducts();
  const colors = [
    "White",
    "Black",
    "Red",
    "Yellow",
    "Green",
    "Blue",
    "Purpule",
    "Orange",
  ];
  const category = [
    "Sandals",
    "Sneakers",
    "Boots",
    "Hikingshoes",
    "Flipflops",
    "Running",
  ];

  const { products: items } = useContext(ProductContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      color: "",
      imageId: "",
      price: 0,
      description: "",
      stock: 0,
      category: "",
      id: "",
    },

    validationSchema: Yup.object({
      imageId: Yup.object().required(),
      name: Yup.string().required("Please enter a title"),
      description: Yup.string().required("Please enter a description"),
      price: Yup.number()
        .moreThan(0, "Please enter a number")
        .required("Please enter a price"),
      stock: Yup.number()
        .moreThan(0, "Please enter a number")
        .required("Please enter a quantity"),
      category: Yup.string().required("Please enter a category"),
      color: Yup.string().required("Please select a color"),
    }),

    onSubmit: (values) => {
      console.log("hello");
      const product: ProductData = {
        _id: values.id,
        name: values.name,
        imageId: values.imageId,
        price: values.price,
        description: values.description,
        stock: values.stock,
        category: values.category,
        quantity: values.stock,
        color: values.color,
      };

      formik.resetForm();

      /*       if (editProduct) {
        console.log("trying to edit product, called edit from context");
        editProduct(product);
      } else { */
      console.log("trying to add product, called add from context");
      addProduct(product);
      /*       } */
    },
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch("/api/files", {
      method: "POST",
      body: formData,
    });
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);
        const response = await fetch("/api/files", {
          method: "POST",
          body: formData,
        });
        const imageId = await response.json();
        formik.setFieldValue("imageId", imageId);
        console.log("Response from image is:", imageId);
      } catch (error) {
        if (error instanceof Error) {
          formik.setFieldError("imageId", error.message);
        }
      }
    }
  };

  return (
    <>
      <Form noValidate onSubmit={formik.handleSubmit} data-cy="product-form">
        <FloatingLabel controlId="image" label="Image" className="mb-3">
          <Form.Control
            type="file"
            // placeholder="https://example.jpg"
            name="image"
            // value={formik.values.imageId}
            onChange={handleFileChange}
            // onBlur={formik.handleBlur}
            data-cy="product-image"
            isInvalid={formik.touched.imageId && !!formik.errors.imageId}
          />
          {formik.touched.imageId && formik.errors.imageId && (
            <Form.Control.Feedback type="invalid" data-cy="product-image-error">
              {formik.errors.imageId}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>

        <FloatingLabel controlId="name" label="Product name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Example"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            data-cy="product-title"
            isInvalid={formik.touched.name && !!formik.errors.name}
          />
          {formik.touched.name && formik.errors.name && (
            <Form.Control.Feedback type="invalid" data-cy="product-name-error">
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
            style={{ marginTop: "1rem" }}
            type="text"
            placeholder="Set a price for the product"
            name="price"
            value={formik.values.price}
            onChange={(e) =>
              formik.setFieldValue("price", Number(e.target.value))
            }
            onBlur={formik.handleBlur}
            data-cy="product-price"
            isInvalid={formik.touched.price && !!formik.errors.price}
          />
          {formik.touched.price && formik.errors.price && (
            <Form.Control.Feedback type="invalid" data-cy="product-price-error">
              {formik.errors.price}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>

        <FloatingLabel controlId="stock" label="Amount in Stock">
          <Form.Control
            style={{ marginTop: "1rem" }}
            type="text"
            placeholder="Set how many in stock"
            name="stock"
            value={formik.values.stock}
            onChange={(e) =>
              formik.setFieldValue("stock", Number(e.target.value))
            }
            onBlur={formik.handleBlur}
            data-cy="product-stock"
            isInvalid={formik.touched.stock && !!formik.errors.stock}
          />
          {formik.touched.stock && formik.errors.stock && (
            <Form.Control.Feedback type="invalid" data-cy="product-stock-error">
              {formik.errors.stock}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>

        <FloatingLabel controlId="color" label="Color" className="mb-3">
          <Form.Select
            style={{ marginTop: "1rem" }}
            name="color"
            value={formik.values.color}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            data-cy="product-color"
            isInvalid={formik.touched.color && !!formik.errors.color}
          >
            <option>Select a color</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </Form.Select>
          {formik.touched.color && formik.errors.color && (
            <Form.Control.Feedback type="invalid" data-cy="product-color-error">
              {formik.errors.color}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>

        <FloatingLabel controlId="category" label="category" className="mb-3">
          <Form.Select
            style={{ marginTop: "1rem" }}
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            data-cy="product-category"
            isInvalid={formik.touched.category && !!formik.errors.category}
          >
            <option>Select a category</option>
            {category.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
          {formik.touched.category && formik.errors.category && (
            <Form.Control.Feedback
              type="invalid"
              data-cy="product-category-error"
            >
              {formik.errors.category}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>

        <Button type="submit" style={{ marginTop: "1rem" }}>
          Create product
        </Button>
      </Form>
    </>
  );
}
