import styled from "styled-components";

interface SelectFilterProps {
  filter: string[];
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  showLabel?: boolean;
}

export function FilterSelect({
  filter,
  selectedOption,
  setSelectedOption,
  showLabel = true,
}: SelectFilterProps) {
  return (
    <>
      {showLabel && <FilterLabel htmlFor="size">Filter:</FilterLabel>}
      <SelectFilterInput
        id="filter"
        value={selectedOption}
        onChange={(event) => setSelectedOption(event.target.value)}
      >
        {filter.map((customFilter) => (
          <option key={customFilter}>{customFilter}</option>
        ))}
      </SelectFilterInput>
    </>
  );
}

const FilterLabel = styled.label`
  margin-right: 10px;
`;

const SelectFilterInput = styled.select`
  height: 3rem;
  margin-top: 10px;
  padding: 10px;
`;
