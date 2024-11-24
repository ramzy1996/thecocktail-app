import axios from "axios";
import { Cocktail } from "../interfaces/cocktail";

export const getRandomCocktails = async (): Promise<{ response: Cocktail | null; isLoading: boolean }> => {
  let isLoading = true; 
  let response: Cocktail | null = null;

  try {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/random.php`);
    response = result.data.drinks[0]; 
  } catch (error) {
    console.error("Error fetching cocktail data:", error);
    response = null;
  } finally {
    isLoading = false;
  }

  return { response, isLoading };
};
