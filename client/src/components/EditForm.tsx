import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ProductContext, ProductData } from "../contexts/ProductContext";

export function EditForm() {
  const { getAllProducts, setEditingItem, editProduct } = useContext(ProductContext);

  useEffect(() => {
    if (!editProduct) {
      const storedItem = localStorage.getItem("selectedItem") ?? "{}";
      const storedObj = JSON.parse(storedItem) as ProductData;
      setEditingItem(storedObj);
      formik.setFieldValue("image", storedObj.imageUrl);
      formik.setFieldValue("title", storedObj.name);
      formik.setFieldValue("description", storedObj.description);
      formik.setFieldValue("price", storedObj.price);
    }
  }, []);

  const navigate = useNavigate();

  const formik = useFormik<ProductData>({
    initialValues: {
      imageUrl: editProduct?.imageUrl ?? "",
      name: editProduct?.name ?? "",
      description: editProduct?.description ?? "",
      price: editProduct?.price ?? "" as any,
      id: "",
      stock: editProduct?.stock ?? "" as any,
      quantity: editProduct?.quantity ?? "" as any,
      categories: editProduct?.categories ?? "",
    },
    validationSchema: Yup.object({
      image: Yup.string().url("Please enter a valid URL").required("Please include a URL-link."),
      title: Yup.string().required("Please add a product title."),
      description: Yup.string().required("Please provide a description."),
      price: Yup.number().moreThan(0).required("Please set a price to the item."),
    }),
    onSubmit: (values) => {
      if (!editProduct) return;
      getAllProducts({
        ...editProduct,
        imageUrl: values.imageUrl,
        name: values.name,
        description: values.description,
        price: values.price,
        id: values.id,
        stock: values.stock, 
        quantity: values.quantity,
        categories: values.categories
      });
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit} data-cy="product-form">
      <Form.Group controlId="image">
        <Form.Label style={{ marginTop: "1rem" }}>Image</Form.Label>
        <Form.Control
          type="text"
          value={formik.values.imageUrl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.imageUrl && !!formik.errors.imageUrl}
          data-cy="product-image"
        />
          {formik.touched.imageUrl && formik.errors.imageUrl && (
            <Form.Control.Feedback
              type="invalid"
              data-cy="product-image-error"
            >
              {formik.errors.imageUrl}
            </Form.Control.Feedback>
          )}
      </Form.Group>

      <Form.Group controlId="title">
        <Form.Label style={{ marginTop: "1rem" }}>Title</Form.Label>
        <Form.Control
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.name && !!formik.errors.name}
          data-cy="product-title"
        />
          {formik.touched.name && formik.errors.name && (
            <Form.Control.Feedback
              type="invalid"
              data-cy="product-title-error"
            >
              {formik.errors.name}
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
