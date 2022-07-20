import { useRouter } from "next/router";
import Button from "@/ui-core/Button";
import LazyImage from "@/ui-core/LazyImage";
import { Book } from "@/interfaces";
import { formatCurrency, getFormattedDate } from "@/utils/helpers";

interface CardProps {
  book: Book;
}

const Card = ({ book }: CardProps) => {
  const router = useRouter();
  const handleReadMore = () => {
    router.push(encodeURI(book.title));
  };
  return (
    <div className="flex flex-col justify-between mx-4 mb-4 overflow-hidden rounded-lg shadow-lg sm:max-w-xs">
      <LazyImage alt={book.title || ""} src={book.thumbnailUrl} />
      <div className="flex flex-col justify-between flex-1">
        <div className="px-6 py-4">
          <h4 className="mb-3 overflow-hidden text-xl font-bold tracking-tight text-gray-800 text-ellipsis whitespace-nowrap">
            {book.title}
          </h4>
          <h4 className="mb-4 overflow-hidden leading-normal text-gray-700 text-md text-ellipsis whitespace-nowrap">
            {book.authors?.length ? book.authors.join(", ") : "-"}
          </h4>
          {book.categories?.length ? (
            <div className="flex flex-col items-center justify-between mb-2">
              <h4 className="mb-3 font-semibold tracking-tight text-gray-600 text-md">
                Categories
              </h4>
              <div className="flex w-full justify-evenly">
                {book.categories.map((category) => (
                  <span
                    className="inline-block p-2 mx-2 mb-2 overflow-hidden bg-gray-300 rounded-xl text-ellipsis whitespace-nowrap"
                    key={category}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
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
        <Button className="mx-auto text-center" onClick={handleReadMore}>
          Read More
        </Button>
      </div>
    </div>
  );
};

export default Card;
