import React from "react";
import Button from "../atoms/Button";

type headerProps = {
  fetchAllCocktailData: () => void;
};

const Header = ({ fetchAllCocktailData }: headerProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 justify-between">
      <h1 className="text-xl sm:text-2xl font-bold">Random Cocktails</h1>

      <Button
        buttonText="Refresh"
        onClick={fetchAllCocktailData}
        className="bg-blue-500"
      />
    </div>
  );
};

export default Header;
