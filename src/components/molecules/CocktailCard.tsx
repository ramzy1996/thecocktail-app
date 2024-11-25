/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cocktail } from "@/lib/interfaces/cocktail";
import Image from "next/image";
import React, { useState } from "react";
import Spinner from "../atoms/Spinner";

type cocktailCardProps = {
  item: Cocktail;
  children: any;
};

const CocktailCard = ({ item, children }: cocktailCardProps) => {
  const [isImageLoading, setisImageLoading] = useState(true);
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <div className="w-full h-48">
        {isImageLoading && <Spinner />}
        <Image
          width={200}
          height={200}
          src={item.strDrinkThumb}
          alt={item.strDrink}
          className="w-full h-48 object-cover rounded-md"
          onLoad={() => setisImageLoading(false)}
        />
      </div>
      <h2 className="text-lg font-semibold mt-2">{item.strDrink}</h2>
      <p className="text-sm text-gray-600">{item.strCategory}</p>

      {children}
    </div>
  );
};

export default CocktailCard;
