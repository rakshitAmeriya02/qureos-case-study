import BookIcon from "components/BookIcon";
import Layout from "components/Layout";
import Loader from "components/Loader";
import { Book } from "interfaces";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { LOCAL_STORAGE } from "utils/constant";
import { extractJSON, fetchData, saveJSON } from "utils/helpers";

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
        saveJSON(LOCAL_STORAGE.BOOKS_DATA, books);
        setBooks(books);
      }
    };
    if (window) {
      const books = extractJSON(LOCAL_STORAGE.BOOKS_DATA);
      if (books) {
        setBooks(books);
      } else {
        fetchBooksData();
      }
    }
  }, []);

  const handleHomeRedirection = () => {
    router.push("/");
  };

  return (
    <Layout>
      {!books ? (
        <Loader
          descriptionText="It might take a while"
          titleText="Fetching Book"
        />
      ) : bookDetail ? (
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-xl font-bold">{bookDetail?.title}</h2>
            <div className="max-w-xs mx-auto my-2">
              {!bookDetail?.thumbnailUrl || !showErrorImg ? (
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
            {bookDetail?.longDescription || bookDetail?.shortDescription ? (
              <p>
                {bookDetail?.longDescription || bookDetail?.shortDescription}
              </p>
            ) : (
              <h2 className="mb-2 text-lg font-bold">
                No description available
              </h2>
            )}
          </div>
        </div>
      ) : (
        <div className="container flex items-center justify-center h-full mx-auto">
          <div className="flex flex-col items-center">
            <h2 className="mb-2 text-xl font-bold">
              Data not found, go back to home
            </h2>
            <button
              onClick={handleHomeRedirection}
              className="px-4 py-2 mx-4 mb-4 font-semibold text-gray-700 bg-transparent border border-gray-500 rounded hover:bg-gray-500 hover:text-white hover:border-transparent"
            >
              Home
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BookDetail;
