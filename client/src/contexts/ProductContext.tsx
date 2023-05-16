import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product, products as mockedProducts } from "../../data";

interface ProductContextValue {
    products: Product[]
    handleDelete: (id: string) => void;
    handleEdit: (id: string) => void;
    handleSave: (editedItem: Product) => void;

    // Ta bort...
    editingItem: Product | null
    setEditingItem: React.Dispatch<React.SetStateAction<Product | null>>
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

export const ProductContext = createContext({} as ProductContextValue);
export const useProducts = () => useContext(ProductContext)

export function ProductProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(mockedProducts);

  const handleDelete = (id: string) => {
    const updatedItems = products.filter((item) => item.id !== id);
    setProducts(updatedItems);
    localStorage.setItem("products", JSON.stringify(updatedItems));
  };
  
  const handleEdit = (id: string) => {
    const itemToEdit = products.find((item) => item.id === id);
    if (itemToEdit) {
      navigate(`/admin/product/editItem/${itemToEdit.id}`);
      setEditingItem(itemToEdit);
      localStorage.setItem("selectedItem", JSON.stringify(itemToEdit));
    } else {
      setEditingItem(null);
    }
  };
  
  const handleSave = (editedItem: Product) => {
    const updatedItems = products.map((item) =>
    item.id === editedItem.id ? editedItem : item
    );
    navigate("/admin");
    setProducts(updatedItems);
    setEditingItem(null);
    localStorage.setItem("products", JSON.stringify(updatedItems));
    localStorage.setItem("selectedItem", JSON.stringify([]));
  };
  
  return (
    <ProductContext.Provider
      value={{ editingItem, setEditingItem, handleEdit, handleDelete, handleSave, products, setProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
}
