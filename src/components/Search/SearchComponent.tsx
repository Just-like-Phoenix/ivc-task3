import React from "react";
import { SearchDiv, SearchInput } from "./StyledComponents";

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 250,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <SearchInput
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

const SearchComponent = ({
  globalFilter,
  setGlobalFilter,
}: {
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <SearchDiv>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="p-2 font-lg shadow border border-block"
          placeholder="Поиск"
        />
      </SearchDiv>
    </>
  );
};

export default SearchComponent;
