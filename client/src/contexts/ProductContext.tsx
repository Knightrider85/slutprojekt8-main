import { FC, createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRequest } from "../hooks/useRequest";

export interface ProductData {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageId: string;
  imageUrl?: string;
  quantity: number;
  color: string;
}

interface Filters {
  price: string;
  category: string;
  color: string;
}

interface ProductContext {
  selectedProduct: ProductData | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductData | null>>;
  products: ProductData[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  removeProduct: (id: string) => void;
  editProduct: (product: ProductData) => void;
  addProduct: (product: ProductData) => void;
  getAllProducts: () => Promise<void>;
  //uploadImage: (file: File) => Promise<string>;
}

export const ProductContext = createContext<ProductContext>({
  //uploadImage: async () => "",
  selectedProduct: null,
  setSelectedProduct: () => {},
  products: [],
  filters: {
    price: "None",
    category: "None",
    color: "None",
  },
  setFilters: () => {},
  addProduct: async () => {},
  removeProduct: async (id: string) => {},
  editProduct: () => {},
  getAllProducts: async () => {},
});

export const ProductProvider: FC<{ children: React.ReactNode }> = (
  props: any
) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null
  );
  const [filters, setFilters] = useState<Filters>({
    price: "None",
    category: "None",
    color: "None",
  });

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
      // Convert filters object into an object with only string values
      const stringFilters = Object.fromEntries(
        Object.entries(filters).map(([key, value]) => [key, String(value)])
      );

      // Include filters in the request
      const response = await fetch(
        `/api/products/all?${new URLSearchParams(stringFilters).toString()}`
      );

      const data = await response.json();
      if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        console.error("Error fetching products: Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [filters]); // Refetch when filters change

  useEffect(() => {
    getAllProducts();
  }, []);

  const removeProduct = async (id: string) => {
    try {
      let { data, ok } = await useRequest(`/api/products/${id}`, "DELETE");
      if (ok) {
        setProducts(products.filter((product) => product._id !== id));
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
        `/api/products/${product._id}`,
        "PUT",
        product
      );
      if (ok) {
        setProducts(
          products.map((item) => (item._id === product._id ? product : item))
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
        filters,
        setFilters,
        //uploadImage,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
