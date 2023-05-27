import Accordion from "react-bootstrap/esm/Accordion";
import { FilterSelect } from "./FilterSelect";
import React, { Dispatch, SetStateAction, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FilterList() {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const price = ["Lowest to Highest", "Highest to Lowest"];

  const colors = [
    "None",
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
    "None",
    "Sandals",
    "Sneakers",
    "Boots",
    "Hikingshoes",
    "Flipflops",
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
              selectedOption={selectedSize}
              setSelectedOption={setSelectedSize}
            />
          </Accordion.Body>
          <Accordion.Body>
            <label htmlFor="">Color:</label>
            <FilterSelect
              showLabel={false}
              filter={colors}
              selectedOption={selectedColor}
              setSelectedOption={setSelectedColor}
            />
          </Accordion.Body>
          <Accordion.Body>
            <label htmlFor="">Category:</label>
            <FilterSelect
              showLabel={false}
              filter={category}
              selectedOption={selectedBrand}
              setSelectedOption={setSelectedBrand}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
