import React from "react";

type headerProps = {
  fetchAllCocktailData: () => void;
};

const Header = ({ fetchAllCocktailData }: headerProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 justify-between">
      <h1 className="text-xl sm:text-2xl font-bold">Random Cocktails</h1>
      <button
        onClick={fetchAllCocktailData}
        className="p-2 bg-blue-500 text-white rounded-md text-sm sm:text-base"
      >
        Refresh
      </button>
    </div>
  );
};

export default Header;
