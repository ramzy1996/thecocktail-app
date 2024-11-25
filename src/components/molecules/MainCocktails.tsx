import React, { SetStateAction } from "react";
import Spinner from "../atoms/Spinner";
import NotFound from "../atoms/NotFound";
import Button from "../atoms/Button";
import Pagination from "../atoms/Pagination";
import { Cocktail } from "@/lib/interfaces/cocktail";
import CocktailCard from "./CocktailCard";

type mainCocktailsProps = {
  isLoading: boolean;
  paginatedCocktails: Cocktail[];
  favorites: Cocktail[];
  setFavorites: (value: SetStateAction<Cocktail[]>) => void;
  handlePageChange: (page: number) => void;
  cocktails: Cocktail[];
  currentPage: number;
  totalPages: number;
};

const MainCocktails = ({
  isLoading,
  paginatedCocktails,
  favorites,
  setFavorites,
  handlePageChange,
  cocktails,
  currentPage,
  totalPages,
}: mainCocktailsProps) => {
  const isFavorite = (cocktailId: string) =>
    favorites.some((cocktail) => cocktail.idDrink === cocktailId);
  const addToFavorites = (cocktail: Cocktail) => {
    setFavorites([...favorites, cocktail]);
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!Array.isArray(paginatedCocktails) ||
          paginatedCocktails.length === 0 ||
          paginatedCocktails.every(
            (item) => item === null || item === undefined
          ) ? (
            <NotFound />
          ) : (
            paginatedCocktails.map((cocktail, index) => (
              <CocktailCard item={cocktail} key={index}>
                <Button
                  buttonText={
                    isFavorite(cocktail.idDrink)
                      ? "Added to Favorites"
                      : "Add to Favorites"
                  }
                  onClick={() => addToFavorites(cocktail)}
                  isDisabled={isFavorite(cocktail.idDrink)}
                  className="mt-2 bg-green-500"
                />
              </CocktailCard>
            ))
          )}
        </div>
      )}

      <Pagination
        items={cocktails}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default MainCocktails;
