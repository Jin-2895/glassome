import React, { InputHTMLAttributes, ReactNode } from "react";
import { Input } from "../Input/Input";

type Base = {
  id: string;
  name: string;
};

type SearchProps<T> = InputHTMLAttributes<HTMLInputElement> & {
  searchItems: T[];
  renderItem: (item: T) => ReactNode;
};

const filterItems = <T extends { id: string; name: string }>(
  searchItems: T[],
  value: string
) => {
  if (!value) {
    return searchItems;
  }

  const newSearchedItems = searchItems.filter(
    ({ name }) => name.toLowerCase().indexOf(value.toLowerCase()) > -1
  );
  return newSearchedItems;
};

const Search = <T extends Base>({
  searchItems,
  renderItem,
  value,
  ...rest
}: SearchProps<T>) => {
  const filteredItems = filterItems(searchItems, String(value));

  return (
    <div className="max-w-[481px] h-48">
      <div>
        <Input
          placeholder="Search"
          className="border border-black px-2 py-3 rounded-md"
          {...rest}
        />
      </div>
      <ul className="bg-white mt-2 px-1 overflow-y-auto max-h-36 scrollbar-thin scrollbar-thumb-light-grey scrollbar-track-white scrollbar-thumb-rounded-md scrollbar-track-rounded-md">
        {filteredItems.map(renderItem)}
      </ul>
    </div>
  );
};

export { Search };
