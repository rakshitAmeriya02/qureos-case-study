import { Book } from "interfaces";
import { useRouter } from "next/router";
import Button from "ui-core/Button";
import LazyImage from "ui-core/LazyImage";
import { formatCurrency, getFormattedDate } from "utils/helpers";

interface CardProps {
  book: Book;
}

const Card = ({ book }: CardProps) => {
  const router = useRouter();
  const handleReadMore = () => {
    router.push(encodeURI(book.title));
  };
  return (
    <div className="flex flex-col mx-4 mb-4 overflow-hidden rounded-lg shadow-lg sm:max-w-xs ">
      <LazyImage alt={book.title || ""} src={book.thumbnailUrl} />
      <div className="px-6 py-4">
        <h4 className="mb-3 overflow-hidden text-xl font-bold tracking-tight text-gray-800 text-ellipsis whitespace-nowrap">
          {book.title}
        </h4>
        <h4 className="mb-4 overflow-hidden leading-normal text-gray-700 text-md text-ellipsis whitespace-nowrap">
          {book.authors?.length ? book.authors.join(", ") : "-"}
        </h4>
        <div className="flex flex-wrap justify-between">
          <h4 className="mb-3 font-semibold tracking-tight text-gray-600 text-md">
            Pusblished
          </h4>
          <p className="leading-normal text-gray-500 text-md">
            {book?.published?.$date
              ? getFormattedDate(book?.published?.$date)
              : "N/A"}
          </p>
        </div>
        <div className="flex flex-wrap justify-between">
          <h4 className="mb-3 font-semibold tracking-tight text-gray-600 text-md">
            Price
          </h4>
          <p className="leading-normal text-gray-500 text-md">
            {book?.published?.price
              ? formatCurrency(book.published.price, book.published.currency)
              : "N/A"}
          </p>
        </div>
      </div>
      <Button onClick={handleReadMore}>Read More</Button>
    </div>
  );
};

export default Card;
