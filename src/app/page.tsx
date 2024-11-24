"use client";
import Favorites from "@/components/Favorites";
import Header from "@/components/Header";
import NotFound from "@/components/NotFound";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import Spinner from "@/components/Spinner";
import { getRandomCocktails } from "@/lib/api/getRandomCocktails";
import { searchCocktailsByName } from "@/lib/api/searchCocktailsByName";
import { Cocktail } from "@/lib/interfaces/cocktail";
import Image from "next/image";
import { useState, useEffect } from "react";

const Home = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [cocktails, setCocktails] = useState<Cocktail[]>(
    Array(itemsPerPage).fill(null)
  );
  const [favorites, setFavorites] = useState<Cocktail[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentFavoritesPage, setCurrentFavoritesPage] = useState(1); // Add state for favorites pagination
  const seenCocktailIds = new Set<string>();

  const fetchUniqueCocktail = async (index: number) => {
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 20) {
      const { response: data } = await getRandomCocktails();

      if (data && !seenCocktailIds.has(data.idDrink)) {
        seenCocktailIds.add(data.idDrink);
        setCocktails((prev) => {
          const updated = [...prev];
          updated[index] = data;
          return updated;
        });

        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      console.error(`Failed to fetch a unique cocktail for index ${index}`);
    }
  };

  const fetchAllCocktailData = () => {
    setCocktails(Array(itemsPerPage).fill(null));
    seenCocktailIds.clear();

    for (let i = 0; i < itemsPerPage; i++) {
      fetchUniqueCocktail(i);
    }
  };

  useEffect(() => {
    fetchAllCocktailData();
  }, []);

  const handleSearch = async () => {
    setIsSearchLoading(true);
    try {
      setCocktails(Array(itemsPerPage).fill(null));
      setCurrentPage(1);

      const { response: searchResults } = await searchCocktailsByName(
        searchQuery.trim()
      );

      if (searchResults) {
        setCocktails(searchResults);
      } else {
        console.error("No search results found.");
      }
    } catch (error) {
      console.error("Error fetching search results", error);
    } finally {
      setIsSearchLoading(false);
    }
  };

  const paginatedCocktails = cocktails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(cocktails.length / itemsPerPage);

  const paginatedFavorites = favorites.slice(
    (currentFavoritesPage - 1) * itemsPerPage,
    currentFavoritesPage * itemsPerPage
  );

  const totalFavoritePages = Math.ceil(favorites.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFavoritesPageChange = (page: number) => {
    setCurrentFavoritesPage(page);
  };

  const addToFavorites = (cocktail: Cocktail) => {
    setFavorites([...favorites, cocktail]);
  };

  const removeFromFavorites = (cocktailId: string) => {
    setFavorites(
      favorites.filter((cocktail) => cocktail.idDrink !== cocktailId)
    );
  };

  const isFavorite = (cocktailId: string) =>
    favorites.some((cocktail) => cocktail.idDrink === cocktailId);

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Header fetchAllCocktailData={fetchAllCocktailData} />

        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
      </div>

      {isSearchLoading ? (
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
              <div key={index} className="border p-4 rounded-lg shadow-md">
                {cocktail ? (
                  <>
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
                    <p className="text-sm text-gray-600">
                      {cocktail.strCategory}
                    </p>
                    <button
                      onClick={() => addToFavorites(cocktail)}
                      disabled={isFavorite(cocktail.idDrink)}
                      className={`mt-2 p-2 rounded-md w-full text-sm sm:text-base ${
                        isFavorite(cocktail.idDrink)
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {isFavorite(cocktail.idDrink)
                        ? "Added to Favorites"
                        : "Add to Favorites"}
                    </button>
                  </>
                ) : (
                  <Spinner />
                )}
              </div>
            ))
          )}
        </div>
      )}

      <Pagination
        items={cocktails}
        // itemsPerPage={itemsPerPage}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      <Favorites
        favorites={favorites}
        paginatedFavorites={paginatedFavorites}
        removeFromFavorites={removeFromFavorites}
        // itemsPerPage={itemsPerPage}
        handleFavoritesPageChange={handleFavoritesPageChange}
        currentFavoritesPage={currentFavoritesPage}
        totalFavoritePages={totalFavoritePages}
      />
    </div>
  );
};

export default Home;
