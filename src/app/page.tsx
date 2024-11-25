/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Favorites from "@/components/molecules/Favorites";
import Header from "@/components/molecules/Header";
import Search from "@/components/molecules/Search";
import { getRandomCocktails } from "@/lib/api/getRandomCocktails";
import { searchCocktailsByName } from "@/lib/api/searchCocktailsByName";
import { Cocktail } from "@/lib/interfaces/cocktail";
import { useState, useEffect } from "react";
import MainCocktails from "@/components/molecules/MainCocktails";

const Home = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [cocktails, setCocktails] = useState<Cocktail[]>(
    Array(itemsPerPage).fill(null)
  );
  const [favorites, setFavorites] = useState<Cocktail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentFavoritesPage, setCurrentFavoritesPage] = useState(1);
  const seenCocktailIds = new Set<string>();

  const fetchAllCocktailData = async () => {
    setIsLoading(true);
    setCocktails(Array(itemsPerPage).fill(null));
    seenCocktailIds.clear();

    try {
      const results = await Promise.all(
        Array.from({ length: itemsPerPage }, () => getRandomCocktails())
      );

      const uniqueCocktails = [];
      results.forEach(({ response: data }) => {
        if (data && !seenCocktailIds.has(data.idDrink)) {
          seenCocktailIds.add(data.idDrink);
          uniqueCocktails.push(data);
        }
      });

      while (uniqueCocktails.length < itemsPerPage) {
        const { response: data } = await getRandomCocktails();
        if (data && !seenCocktailIds.has(data.idDrink)) {
          seenCocktailIds.add(data.idDrink);
          uniqueCocktails.push(data);
        }
      }

      setCocktails(uniqueCocktails);
    } catch (error) {
      console.error("Failed to fetch cocktail data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCocktailData();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(cocktails.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFavoritesPageChange = (page: number) => {
    setCurrentFavoritesPage(page);
  };

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

      <MainCocktails
        cocktails={cocktails}
        currentPage={currentPage}
        favorites={favorites}
        handlePageChange={handlePageChange}
        isLoading={isLoading}
        itemsPerPage={itemsPerPage}
        setFavorites={setFavorites}
        totalPages={totalPages}
      />

      <Favorites
        favorites={favorites}
        setFavorites={setFavorites}
        itemsPerPage={itemsPerPage}
        handleFavoritesPageChange={handleFavoritesPageChange}
        currentFavoritesPage={currentFavoritesPage}
      />
    </div>
  );
};

export default Home;
