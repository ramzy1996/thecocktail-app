import Image from "next/image";

type CocktailCardProps = {
  name: string;
  imageUrl: string;
  category: string;
  onAdd?: () => void;
  onRemove?: () => void;
  isFavourite?: boolean;
};

const CocktailCard: React.FC<CocktailCardProps> = ({
  name,
  imageUrl,
  category,
  onAdd,
  onRemove,
  isFavourite = false,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Image className="w-full" src={imageUrl} alt={name} />
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-700 text-base">{category}</p>
      </div>
      <div className="px-6 py-4 flex justify-between">
        {isFavourite ? (
          <button onClick={onRemove} className="bg-red-500 text-white py-1 px-4 rounded">
            Remove
          </button>
        ) : (
          <button onClick={onAdd} className="bg-blue-500 text-white py-1 px-4 rounded">
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default CocktailCard;