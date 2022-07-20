import LazyImage from "@/ui-core/LazyImage";
import { Book } from "@/interfaces";
import { TEXT } from "@/utils/constant";

interface BookDetailProps {
  book: Book;
}

const BookDetail = ({book}: BookDetailProps) => {
  return (
    <div className="container mx-auto">
      <div className="text-center">
        <h2 className="text-xl font-bold">{book?.title}</h2>
        <div className="max-w-xs mx-auto my-2">
          <LazyImage
            alt={book.title}
            hideNoContentText
            src={book.thumbnailUrl}
          />
        </div>
        {book?.longDescription || book?.shortDescription ? (
          <p>{book?.longDescription || book?.shortDescription}</p>
        ) : (
          <h2 className="mb-2 text-lg font-bold">
            {TEXT.NO_DESCRIPTION_AVAILABLE}
          </h2>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
