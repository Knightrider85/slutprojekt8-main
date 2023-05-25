import { FC, createContext, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useRequest } from "../hooks/useRequest";

export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  /*imageId?: string;*/
  stock: number;
  categories: string[];
  imageId: string;
  imageUrl?: string;
  quantity:number,
  color: string,
}

interface ProductContext {
    selectedProduct: {},
    setSelectedProduct: {},
    products: ProductData[],
    removeProduct: (id: string) => void,
    editProduct: (id:string) => void, //
    addProduct: (product: ProductData) => void,
    getAllProducts: () => Promise<void>;
    uploadImage: (file: File) => Promise<string>;
}

export const ProductContext = createContext<ProductContext>({
  selectedProduct: {},
  setSelectedProduct: {},
  products: [],
  addProduct: async () => {},
  removeProduct: async (id: string) => {},
  editProduct: () => {},
  getAllProducts: async () => {},
  uploadImage: async () => "",
});

export const ProductProvider: FC = (props: any) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const params = useParams<{ id: string }>();

  const addProduct = async (product: ProductData) => {
    let response = await useRequest("/api/product", "POST", product);
    return response;
  }

  const getAllProducts = async () => {
    try {
      let { data, ok } = await useRequest(`/api/products`, "GET");
      if (ok) {
        setProducts(data);
      }
    } catch (err){
      return console.log(err);
    }
  }



  const removeProduct = async (id: string) => {
    try {
        let { data, ok } = await useRequest(`/api/product/${id}`, "DELETE");
        if (ok){
            return data;
        }
    } catch (err) {
        return console.log(err)
    }
}

  const editProduct = async (id: string) => {
    try {
      let { data, ok } = await useRequest(
        `/api/product/${id}`,
        "PUT",
        id
      );
      if (ok) {
        return data;
      }
    } catch (err) {
      return console.log(err);
    }
  };
  
  const uploadImage = async (file: File) => {
    // Ladda upp bild till API'et
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch("/api/images", { method: "POST", body: formData });
    const imageId = await response.json();
    return imageId;
  }
  
  return (
    <ProductContext.Provider
      value={{ addProduct, removeProduct, editProduct, products, selectedProduct, setSelectedProduct, getAllProducts, uploadImage }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}


export const useProducts = () => useContext(ProductContext)