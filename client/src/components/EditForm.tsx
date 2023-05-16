import { useContext, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Product } from "../../data";
import { ProductContext } from "../contexts/ProductContext";
import { useFormik } from "formik";
import * as Yup from "yup";

export function EditForm() {
  const { handleSave, setEditingItem, editingItem } = useContext(ProductContext);

  useEffect(() => {
    if (!editingItem) {
      const storedItem = localStorage.getItem("selectedItem") ?? "{}";
      const storedObj = JSON.parse(storedItem) as Product;
      setEditingItem(storedObj);
      formik.setFieldValue("image", storedObj.image);
      formik.setFieldValue("title", storedObj.title);
      formik.setFieldValue("description", storedObj.description);
      formik.setFieldValue("price", storedObj.price);
    }
  }, []);

  const navigate = useNavigate();

  const formik = useFormik<Product>({
    initialValues: {
      image: editingItem?.image ?? "",
      title: editingItem?.title ?? "",
      description: editingItem?.description ?? "",
      price: editingItem?.price ?? "" as any,
      id: "",
    },
    validationSchema: Yup.object({
      image: Yup.string().url("Please enter a valid URL").required("Please include a URL-link."),
      title: Yup.string().required("Please add a product title."),
      description: Yup.string().required("Please provide a description."),
      price: Yup.number().moreThan(0).required("Please set a price to the item."),
    }),
    onSubmit: (values) => {
      if (!editingItem) return;
      handleSave({
        ...editingItem,
        image: values.image,
        title: values.title,
        description: values.description,
        price: values.price,
      });
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit} data-cy="product-form">
      <Form.Group controlId="image">
        <Form.Label style={{ marginTop: "1rem" }}>Image</Form.Label>
        <Form.Control
          type="text"
          value={formik.values.image}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.image && !!formik.errors.image}
          data-cy="product-image"
        />
          {formik.touched.image && formik.errors.image && (
            <Form.Control.Feedback
              type="invalid"
              data-cy="product-image-error"
            >
              {formik.errors.image}
            </Form.Control.Feedback>
          )}
      </Form.Group>

      <Form.Group controlId="title">
        <Form.Label style={{ marginTop: "1rem" }}>Title</Form.Label>
        <Form.Control
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.title && !!formik.errors.title}
          data-cy="product-title"
        />
          {formik.touched.title && formik.errors.title && (
            <Form.Control.Feedback
              type="invalid"
              data-cy="product-title-error"
            >
              {formik.errors.title}
            </Form.Control.Feedback>
          )}
      </Form.Group>
      
      <Form.Group controlId="description">
        <Form.Label style={{ marginTop: "1rem" }}>Description</Form.Label>
        <Form.Control
          type="text"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.description && !!formik.errors.description}
          data-cy="product-description"
        />
          {formik.touched.description && formik.errors.description && (
            <Form.Control.Feedback
              type="invalid"
              data-cy="product-description-error"
            >
              {formik.errors.description}
            </Form.Control.Feedback>
          )}
      </Form.Group>
      
      <Form.Group controlId="price">
        <Form.Label style={{ marginTop: "1rem" }}>Price</Form.Label>
        <Form.Control
          type="text"
          value={formik.values.price}
          onChange={(e) => formik.setFieldValue("price", Number(e.target.value))}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.price && !!formik.errors.price}
          data-cy="product-price"
        />
          {formik.touched.price && formik.errors.price && (
            <Form.Control.Feedback
              type="invalid"
              data-cy="product-price-error"
            >
              {formik.errors.price}
            </Form.Control.Feedback>
          )}
      </Form.Group>

      <Button variant="primary" type="submit" style={{ margin: "1rem" }}>
        Save
      </Button>
      <Button
        variant="outline-danger"
        onClick={() => {
          navigate("/admin");
          setEditingItem(null);
        }}
      >
        Cancel
      </Button>
    </Form>
  );
}
