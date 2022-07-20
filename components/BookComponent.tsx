import { useMemo } from "react";
import { useRouter } from "next/router";
import { useBooks } from "@/hooks/useBooks";
import Loader from "@/components/Loader";
import { TEXT } from "@/utils/constant";
import Button from "@/ui-core/Button";
import BookDetail from "@/components/BookDetail";

const BookComponent = () => {
  const router = useRouter();
  const [books] = useBooks();
  const title = router.query.title || "";

  const bookDetail = useMemo(() => {
    return books?.find((book) => book.title === (title as string)) || null;
  }, [books, title]);

  const handleHomeRedirection = () => {
    router.push("/");
  };

  return (
    <>
      {!books ? (
        <Loader
          descriptionText={TEXT.LOADER_TEXT}
          titleText={TEXT.FETCHING_BOOK}
        />
      ) : bookDetail ? (
        <BookDetail book={bookDetail} />
      ) : (
        <div className="container flex items-center justify-center h-full mx-auto">
          <div className="flex flex-col items-center">
            <h2 className="mb-2 text-xl font-bold">
              {TEXT.BOOK_DATA_NOT_FOUND}
            </h2>
            <Button onClick={handleHomeRedirection}>{TEXT.HOME}</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default BookComponent;
