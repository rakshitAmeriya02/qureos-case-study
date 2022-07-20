import { useMemo } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import BookList from "@/components/BookList";
import Pagination from "@/ui-core/Pagination";
import { useBooks } from "@/hooks/useBooks";
import { getSearchString } from "@/utils/helpers";

const HomeComponent = () => {
  const router = useRouter();
  const query = (router?.query?.query || "") as string;
  const [books, totalPages] = useBooks();
  const page = router?.query?.page ? Number(router.query.page) : 1;

  const filteredBooks = useMemo(() => {
    if (books) {
      const searchInput = query.trim();
      if (searchInput) {
        return books.filter((item) => {
          const searchString = getSearchString(item);
          return searchString.includes(searchInput.toLowerCase());
        });
      }
    }
    return books;
  }, [books, query]);

  return (
    <>
      {!filteredBooks ? (
        <Loader
          descriptionText="It might take a while"
          titleText="Fetching Books Data"
        />
      ) : filteredBooks.length ? (
        <BookList books={filteredBooks} />
      ) : (
        <div className="container flex items-center justify-center h-full mx-auto">
          <h2 className="mb-2 text-xl font-bold">No Books found</h2>
        </div>
      )}
      {query || totalPages < 1 ? null : (
        <Pagination activePage={page} totalPages={1} />
      )}
    </>
  );
};

export default HomeComponent;
