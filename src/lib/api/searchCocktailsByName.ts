import axios from "axios";
import { Cocktail } from "../interfaces/cocktail";

export const searchCocktailsByName = async (query: string): Promise<{ response: Cocktail[] | null; isLoading: boolean }> => {
  let isLoading = true; 
  let response: Cocktail[] | null = null;

  try {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/search.php?s=${query}`);
    response = result.data.drinks; 
  } catch (error) {
    console.error("Error fetching cocktail data:", error);
    response = null;
  } finally {
    isLoading = false;
  }

  return { response, isLoading };
};
