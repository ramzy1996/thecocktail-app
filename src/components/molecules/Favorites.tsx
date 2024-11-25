import React, { Dispatch, SetStateAction } from "react";
import NotFound from "../atoms/NotFound";
import { Cocktail } from "@/lib/interfaces/cocktail";
import Pagination from "../atoms/Pagination";
import Button from "../atoms/Button";
import CocktailCard from "./CocktailCard";

type favoritesProps = {
  favorites: Cocktail[];
  setFavorites: Dispatch<SetStateAction<Cocktail[]>>;
  handleFavoritesPageChange: (page: number) => void;
  currentFavoritesPage: number;
  itemsPerPage: number;
};

const Favorites = ({
  favorites,
  setFavorites,
  handleFavoritesPageChange,
  currentFavoritesPage,
  itemsPerPage,
}: favoritesProps) => {
  const paginatedFavorites = favorites.slice(
    (currentFavoritesPage - 1) * itemsPerPage,
    currentFavoritesPage * itemsPerPage
  );
  const removeFromFavorites = (cocktailId: string) => {
    setFavorites(
      favorites.filter((cocktail) => cocktail.idDrink !== cocktailId)
    );
  };

  const totalFavoritePages = Math.ceil(favorites.length / itemsPerPage);
  return (
    <>
      <h2 className="text-xl sm:text-2xl font-bold mt-6">Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.length === 0 ? (
          <NotFound />
        ) : (
          paginatedFavorites.map((cocktail,index) => (
            <CocktailCard item={cocktail} key={index}>
              <Button
                buttonText="Remove from Favorites"
                onClick={() => removeFromFavorites(cocktail.idDrink)}
                className="bg-red-500 mt-2"
              />
            </CocktailCard>
          ))
        )}
      </div>
      <Pagination
        items={favorites}
        handlePageChange={handleFavoritesPageChange}
        currentPage={currentFavoritesPage}
        totalPages={totalFavoritePages}
      />
    </>
  );
};

export default Favorites;
