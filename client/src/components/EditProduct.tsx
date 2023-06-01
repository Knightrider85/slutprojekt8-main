import { useFormik } from "formik";
import { useRef } from "react";

import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styled from "styled-components";
import * as Yup from "yup";

import { ProductData, useProducts } from "../contexts/ProductContext";
import { EditProductCard } from "./EditProductCard";

const EditProduct: React.FC = () => {
  const {
    products,
    filters,
    selectedProduct,
    setSelectedProduct,
    editProduct,
  } = useProducts();
  const [show, setShow] = useState(false);
  const colors = [
    "White",
    "Black",
    "Red",
    "Yellow",
    "Green",
    "Blue",
    "Brown",
    "Gray",
  ];
  const categories = [
    "Sandals",
    "Sneakers",
    "Boots",
    "Hikingshoes",
    "High heels",
    "Running",
  ];
  const handleClose = () => setShow(false);
  const handleShow = (product: ProductData) => {
    setSelectedProduct(product);
    setShow(true);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    price: Yup.number().required("Required"),
    stock: Yup.number().required("Required"),
    category: Yup.string().required("Required"),
    color: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: selectedProduct || {
      _id: "",
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      color: "",
      quantity: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      editProduct(values);
      handleClose();
    },
    enableReinitialize: true,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const prevProductRef = useRef<ProductData | null>();
  useEffect(() => {
    if (prevProductRef.current !== selectedProduct) {
      formik.resetForm();
    }
    prevProductRef.current = selectedProduct;
  }, [selectedProduct]);

  return (
    <>
      <Button
        style={{ marginTop: '1rem' }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        Edit Product
      </Button>
      {isDropdownOpen && (
        <ProductContainer>
          {products.map((product) => (
            <EditProductCard
              key={product._id}
              product={product}
              onEdit={handleShow}
            />
          ))}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Form onSubmit={formik.handleSubmit}>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div>{formik.errors.name}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    {...formik.getFieldProps("description")}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <div>{formik.errors.description}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    {...formik.getFieldProps("price")}
                  />
                  {formik.touched.price && formik.errors.price ? (
                    <div>{formik.errors.price}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter stock"
                    {...formik.getFieldProps("stock")}
                  />
                  {formik.touched.stock && formik.errors.stock ? (
                    <div>{formik.errors.stock}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select {...formik.getFieldProps("category")}>
                    <option>Select a category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                  {formik.touched.category && formik.errors.category ? (
                    <div>{formik.errors.category}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Color</Form.Label>
                  <Form.Select {...formik.getFieldProps("color")}>
                    <option>Select a color</option>
                    {colors.map((color, index) => (
                      <option key={index} value={color}>
                        {color}
                      </option>
                    ))}
                  </Form.Select>
                  {formik.touched.color && formik.errors.color ? (
                    <div>{formik.errors.color}</div>
                  ) : null}
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </ProductContainer>
      )}
    </>
  );
};

export default EditProduct;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
