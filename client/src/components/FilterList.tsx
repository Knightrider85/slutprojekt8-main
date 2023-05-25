import Accordion from "react-bootstrap/esm/Accordion";
import { SizeSelect } from "./SizeSelect";
import styled from "styled-components";
import React, { Dispatch, SetStateAction, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface FilterListProps {
  sizes: string[];
  colors: string[];
  brands: string[];
  label: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  SelectedOption: string;
}

export default function FilterList({ sizes, colors, brands, label }: FilterListProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{label}</Accordion.Header>
          <Accordion.Body>
            <SizeSelect
              sizes={sizes}
              selectedOption={selectedSize}
              setSelectedOption={setSelectedSize}
            />
          </Accordion.Body>
          <Accordion.Body>
            <label htmlFor="">Color:</label>
            <SizeSelect
              showLabel={false}
              sizes={colors}
              selectedOption={selectedColor}
              setSelectedOption={setSelectedColor}
            />
          </Accordion.Body>
          <Accordion.Body>
            <label htmlFor="">Brand:</label>
            <SizeSelect
              showLabel={false}
              sizes={brands}
              selectedOption={selectedBrand}
              setSelectedOption={setSelectedBrand}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
