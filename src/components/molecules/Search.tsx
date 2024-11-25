import React, { Dispatch, SetStateAction } from "react";
import Button from "../atoms/Button";

type searchProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  handleSearch: () => Promise<void>;
};
const Search = ({ searchQuery, setSearchQuery, handleSearch }: searchProps) => {
  return (
    <div className="flex flex-grow items-center gap-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search cocktails"
        className="flex-grow border p-2 rounded-md text-sm sm:text-base bg-black focus:ring-2 focus:ring-blue-500"
      />

      <Button
        buttonText="Search"
        onClick={handleSearch}
        isDisabled={!searchQuery}
        className="bg-green-500"
      />
    </div>
  );
};

export default Search;
