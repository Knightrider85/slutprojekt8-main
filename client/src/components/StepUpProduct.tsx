import { useEffect, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { IProduct } from "../../../server/models/productModel";

function StepUpProduct() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch("/api/products/all")
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched products:', data);
        if (Array.isArray(data)) { // Check if the response is an array
          setProducts(data);
        } else {
          console.error("Error fetching products: Invalid response format");
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  

  const deleteProduct = (productId: string) => {
    console.log("Deleting product with productId:", productId); // Check the value of productId

    fetch(`/api/products/${productId}`, {
      method: "DELETE",
    })
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  const updateProduct = (productId: string, updatedProductData: any) => {
    fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProductData),
    })
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.map((product) => {
            if (product._id === productId) { // Fix the property name here
              return { ...product, ...updatedProductData };
            }
            return product;
          })
        );
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <>
      <Accordion>
        {products.map((product, index) => (
          <Accordion.Item key={product._id} eventKey={index.toString()}>
            <Accordion.Header>{product.name}</Accordion.Header>
            <Accordion.Body>
              <p>ProductId: {product.id}</p>
              <p>Name: {product.name}</p>
              <p>Description: {product.description}</p>
              <p>Price: {product.price}</p>
              <p>Stock: {product.stock}</p>
              <p>Categories: {product.categories.join(", ")}</p>
              {/* Render additional product information here */}
              <Button
                variant="danger"
                onClick={() => {
                  console.log("productId:", product.productId); // Add this line for debugging
                  deleteProduct(product.productId);
                }}
              >
                Delete
              </Button>

              {/* Render update form or button here */}
              <Button
                variant="primary"
                onClick={() => {
                  console.log("productId:", product.productId); // Add this line for debugging
                  // Handle update logic
                }}
              >
                Update
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}

export default StepUpProduct;
