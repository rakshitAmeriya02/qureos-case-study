import { useMemo } from "react";
import { useRouter } from "next/router";
import { useBooks } from "@/hooks/useBooks";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import LazyImage from "@/ui-core/LazyImage";
import { TEXT } from "@/utils/constant";
import Button from "@/ui-core/Button";

const BookDetail = () => {
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
    <Layout>
      {!books ? (
        <Loader
          descriptionText={TEXT.LOADER_TEXT}
          titleText={TEXT.FETCHING_BOOK}
        />
      ) : bookDetail ? (
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-xl font-bold">{bookDetail?.title}</h2>
            <div className="max-w-xs mx-auto my-2">
              <LazyImage
                alt={bookDetail.title}
                hideNoContentText
                src={bookDetail.thumbnailUrl}
              />
            </div>
            {bookDetail?.longDescription || bookDetail?.shortDescription ? (
              <p>
                {bookDetail?.longDescription || bookDetail?.shortDescription}
              </p>
            ) : (
              <h2 className="mb-2 text-lg font-bold">
                {TEXT.NO_DESCRIPTION_AVAILABLE}
              </h2>
            )}
          </div>
        </div>
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
    </Layout>
  );
};

export default BookDetail;
