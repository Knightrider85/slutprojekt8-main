import { FC, createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRequest } from "../hooks/useRequest";

export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  imageId?: string;
  stock: number;
  category: string;
  //imageId: string;
  imageUrl?: string;
  quantity: number;
  color: string;
}

interface ProductContext {
  selectedProduct: ProductData | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductData | null>>;
  products: ProductData[];
  removeProduct: (id: string) => void;
  editProduct: (product: ProductData) => void; //
  addProduct: (product: ProductData) => void;
  getAllProducts: () => Promise<void>;
  //uploadImage: (file: File) => Promise<string>;
}

export const ProductContext = createContext<ProductContext>({
  selectedProduct: null,
  setSelectedProduct: () => {},
  products: [],
  addProduct: async () => {},
  removeProduct: async (id: string) => {},
  editProduct: () => {},
  getAllProducts: async () => {},
  //uploadImage: async () => "",
});
export const ProductProvider: FC<{ children: React.ReactNode }> = (
  props: any
) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null
  );

  const params = useParams<{ id: string }>();

  const addProduct = async (product: ProductData) => {
    console.log("Form values:", product);
    try {
      let response = await useRequest("/api/products", "POST", product);
      if (response.ok) {
        console.log("product created");
        setProducts([...products, product]);
        return console.log("Product created successfully" + product);
      }
    } catch (err) {
      {
        if (err instanceof Error) {
          return console.error(`Error occurred: ${err.message}`);
        }
      }
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await fetch("/api/products/all");
      const data = await response.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error("Error fetching products: Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const removeProduct = async (id: string) => {
    try {
      let { data, ok } = await useRequest(`/api/products/${id}`, "DELETE");
      if (ok) {
        setProducts(products.filter((product) => product.id !== id));
      }
    } catch (err) {
      if (err instanceof Error) {
        return console.error(`Error occurred: ${err.message}`);
      }
    }
  };

  const editProduct = async (product: ProductData) => {
    try {
      let { data, ok } = await useRequest(
        `/api/products/${product.id}`,
        "PUT",
        product
      );
      if (ok) {
        setProducts(
          products.map((item) => (item.id === product.id ? product : item))
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        return console.error(`Error occurred: ${err.message}`);
      }
    }
  };

  //const uploadImage = async (file: File) => {
  //try {
  // Ladda upp bild till API'et
  //const formData = new FormData();
  //formData.append("image", file);
  //const response = await fetch("/api/images", {
  //  method: "POST",
  // body: formData,
  //});
  // const imageId = await response.json();
  //return imageId;
  //} catch (err) {
  // if (err instanceof Error) {
  //   return console.error(`Error occurred: ${err.message}`);
  // }
  // }
  //};

  return (
    <ProductContext.Provider
      value={{
        addProduct,
        removeProduct,
        editProduct,
        products,
        selectedProduct,
        setSelectedProduct,
        getAllProducts,
        //uploadImage,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
