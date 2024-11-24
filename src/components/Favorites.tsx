import Image from "next/image";
import React from "react";
import NotFound from "./NotFound";
import { Cocktail } from "@/lib/interfaces/cocktail";
import Pagination from "./Pagination";

type favoritesProps = {
  favorites: Cocktail[];
  paginatedFavorites: Cocktail[];
  removeFromFavorites: (cocktailId: string) => void;
//   itemsPerPage: number;
  handleFavoritesPageChange: (page: number) => void;
  currentFavoritesPage: number;
  totalFavoritePages: number;
};

const Favorites = ({
  favorites,
  paginatedFavorites,
  removeFromFavorites,
  handleFavoritesPageChange,
  currentFavoritesPage,
  totalFavoritePages,
}: favoritesProps) => {
  return (
    <>
      <h2 className="text-xl sm:text-2xl font-bold mt-6">Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.length === 0 ? (
          <NotFound />
        ) : (
          paginatedFavorites.map((cocktail) => (
            <div
              key={cocktail.idDrink}
              className="border p-4 rounded-lg shadow-md"
            >
              <Image
                width={200}
                height={300}
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2">
                {cocktail.strDrink}
              </h2>
              <button
                onClick={() => removeFromFavorites(cocktail.idDrink)}
                className="mt-2 p-2 bg-red-500 text-white rounded-md w-full text-sm sm:text-base"
              >
                Remove from Favorites
              </button>
            </div>
          ))
        )}
      </div>
      <Pagination
        items={favorites}
        // itemsPerPage={itemsPerPage}
        handlePageChange={handleFavoritesPageChange}
        currentPage={currentFavoritesPage}
        totalPages={totalFavoritePages}
      />
    </>
  );
};

export default Favorites;
