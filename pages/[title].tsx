import BookIcon from "components/BookIcon";
import Loader from "components/Loader";
import { Book } from "interfaces";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { LOCAL_STORAGE } from "utils/constant";
import { fetchData } from "utils/helpers";

const BookDetail = () => {
  const router = useRouter();
  const [books, setBooks] = useState<Book[] | null>(null);
  const [showErrorImg, setShowErrorImg] = useState(false);
  const title = router.query.title || "";

  const bookDetail = useMemo(() => {
    return books?.find((book) => book.title === (title as string)) || null;
  }, [books, title]);

  useEffect(() => {
    const fetchBooksData = async () => {
      const books = await fetchData(
        "https://run.mocky.io/v3/d7f02fdc-5591-4080-a163-95a08ce6895e"
      );
      if (books) {
        localStorage.setItem(LOCAL_STORAGE.BOOKS_DATA, JSON.stringify(books));
        setBooks(books);
      }
    };
    if (window) {
      const books = localStorage.getItem(LOCAL_STORAGE.BOOKS_DATA);
      if (books) {
        setBooks(JSON.parse(books));
      } else {
        fetchBooksData();
      }
    }
  }, []);

  return (
    <div className="p-4">
      {!books ? (
        <Loader />
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold">{bookDetail?.title}</h2>
          <div className="max-w-xs mx-auto my-2">
            {!bookDetail?.thumbnailUrl || showErrorImg ? (
              <img
                className="w-full"
                src={bookDetail?.thumbnailUrl}
                alt={bookDetail?.title}
                onError={() => setShowErrorImg(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center flex-1">
                <BookIcon />
              </div>
            )}
          </div>
          <p>{bookDetail?.longDescription || bookDetail?.shortDescription}</p>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
