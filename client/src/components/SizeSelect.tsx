import styled from "styled-components";

interface SizeSelectProps {
  sizes: string[];
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
}

export function SizeSelect({ sizes, selectedSize, setSelectedSize }: SizeSelectProps) {


  return (
    <>
      <SizeLabel htmlFor="size">Size:</SizeLabel>
      <SizeSelectInput
        id="size"
        value={selectedSize}
        onChange={(event) => setSelectedSize(event.target.value)}
      >
        {sizes.map((size) => (
          <option key={size}>{size}</option>
        ))}
      </SizeSelectInput>
    </>
  );
}

const SizeLabel = styled.label`
  margin-right: 10px;
`;

const SizeSelectInput = styled.select`
  height: 3rem;
  margin-top: 10px;
  padding: 10px;
`;
