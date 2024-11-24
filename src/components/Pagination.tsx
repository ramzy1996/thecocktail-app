import { Cocktail } from "@/lib/interfaces/cocktail";
import React from "react";

type paginationProps = {
  items: Cocktail[]|[];
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
};

const Pagination = ({
  items,
  handlePageChange,
  currentPage,
  totalPages,
}: paginationProps) => {
  return (
    <>
      {items.length > 0&& Array.isArray(items) && (
        <div className="flex justify-center space-x-2 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`p-2 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
