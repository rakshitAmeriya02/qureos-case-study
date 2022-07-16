import { useRouter } from "next/router";
import React from "react";
import { TEXT } from "utils/constant";
import { clsx } from "utils/helpers";

interface PaginationProps {
  activePage?: number;
  totalPages: number;
}

const Pagination = ({ activePage = 1, totalPages }: PaginationProps) => {
  const router = useRouter();
  const handleChange = (direction: "prev" | "next") => {
    const pathname = window.location.pathname;
    if (direction === "prev") {
      const nextPage = activePage - 1;
      if (nextPage > 0) {
        router.push({
          pathname,
          query: {
            page: nextPage,
          },
        });
      }
    } else if (direction === "next") {
      const nextPage = activePage + 1;
      if (nextPage <= totalPages) {
        router.push(
          {
            pathname,
            query: {
              page: nextPage,
            },
          },
          undefined,
          {
            shallow: true,
          }
        );
      }
    }
  };

  return (
    <div className="text-center">
      <button
        className={clsx(
          "inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
          activePage === 1 && "cursor-not-allowed"
        )}
        disabled={activePage === 1}
        onClick={() => handleChange("prev")}
      >
        {TEXT.PREVIOUS}
      </button>
      <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg cursor-not-allowed">
        {activePage}
      </button>
      <button
        className={clsx(
          "inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
          activePage === totalPages && "cursor-not-allowed"
        )}
        disabled={activePage === totalPages}
        onClick={() => handleChange("next")}
      >
        {TEXT.NEXT}
      </button>
    </div>
  );
};

export default Pagination;
