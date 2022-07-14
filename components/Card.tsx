import { Book } from "interfaces";
import { useState } from "react";
import { formatCurrency, getFormattedDate } from "utils/helpers";
import BookIcon from "./BookIcon";

interface CardProps {
  book: Book;
}

const Card = ({ book }: CardProps) => {
  const [showErrorImg, setShowErrorImg] = useState(false);
  return (
    <div className="flex flex-col mx-4 mb-4 overflow-hidden rounded-lg shadow-lg sm:max-w-xs">
      {book.thumbnailUrl && !showErrorImg ? (
        <img
          className="flex-1 block w-full h-auto rounded-t-lg"
          src={book.thumbnailUrl}
          alt={book.title}
          onError={() => setShowErrorImg(true)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center flex-1">
          <BookIcon />
          <h4 className="mb-3 text-xl font-bold tracking-tight text-gray-800">
            No cover available
          </h4>
        </div>
      )}
      <div className="px-6 py-4">
        <h4 className="mb-3 overflow-hidden text-xl font-bold tracking-tight text-gray-800 text-ellipsis whitespace-nowrap">
          {book.title}
        </h4>
        <h4 className="mb-4 overflow-hidden leading-normal text-gray-700 text-md text-ellipsis whitespace-nowrap">
          {book.authors.join(", ")}
        </h4>
        <div className="flex justify-between">
          <h4 className="mb-3 font-semibold tracking-tight text-gray-600 text-md">
            Pusblished
          </h4>
          <p className="leading-normal text-gray-500 text-md">
            {getFormattedDate(book.published.$date)}
          </p>
        </div>
        <div className="flex justify-between">
          <h4 className="mb-3 font-semibold tracking-tight text-gray-600 text-md">
            Price
          </h4>
          <p className="leading-normal text-gray-500 text-md">
            {formatCurrency(book.published.price, book.published.currency)}
          </p>
        </div>
      </div>
      <button className="px-4 py-2 mx-4 mb-4 font-semibold text-gray-700 bg-transparent border border-gray-500 rounded hover:bg-gray-500 hover:text-white hover:border-transparent">
        Read More
      </button>
    </div>
  );
};

export default Card;
