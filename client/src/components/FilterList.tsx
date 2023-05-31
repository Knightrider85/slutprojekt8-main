import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Accordion from "react-bootstrap/esm/Accordion";
import { useProducts } from "../contexts/ProductContext";
import { FilterSelect } from "./FilterSelect";

export default function FilterList() {
  const { filters, setFilters } = useProducts();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleSelect = (filterKey: string) => (selectedOption: any) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [filterKey]: selectedOption,
    }));
  };

  const price = ["None", "Lowest to Highest", "Highest to Lowest"];

  const colors = [
    "None",
    "White",
    "Black",
    "Red",
    "Yellow",
    "Green",
    "Blue",
    "Brown",
    "Gray",
  ];
  const category = [
    "None",
    "Sandals",
    "Sneakers",
    "Boots",
    "Hikingshoes",
    "High heels",
    "Running",
  ];

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{"Filterar efter"}</Accordion.Header>
          <Accordion.Body>
            <FilterSelect
              filter={price}
              selectedOption={filters.price}
              setSelectedOption={handleSelect("price")}
            />
          </Accordion.Body>
          <Accordion.Body>
            <label htmlFor="">Color:</label>
            <FilterSelect
              showLabel={false}
              filter={colors}
              selectedOption={filters.color}
              setSelectedOption={handleSelect("color")}
            />
          </Accordion.Body>
          <Accordion.Body>
            <label htmlFor="">Category:</label>
            <FilterSelect
              showLabel={false}
              filter={category}
              selectedOption={filters.category}
              setSelectedOption={handleSelect("category")}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
