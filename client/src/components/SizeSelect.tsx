import styled from "styled-components";

interface SizeSelectProps {
  sizes: string[];
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  showLabel?: boolean;
}

export function SizeSelect({ sizes, selectedOption, setSelectedOption, showLabel = true }: SizeSelectProps) {
  return (
    <>
      {showLabel && <SizeLabel htmlFor="size">Size:</SizeLabel>}
      <SizeSelectInput
        id="size"
        value={selectedOption}
        onChange={(event) => setSelectedOption(event.target.value)}
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
