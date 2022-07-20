import { useMemo } from "react";
import { useRouter } from "next/router";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { useBooks } from "@/hooks/useBooks";
import Pagination from "@/ui-core/Pagination";
import { getSearchString } from "@/utils/helpers";

const Home = () => {
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
    <Layout>
      {!filteredBooks ? (
        <Loader
          descriptionText="It might take a while"
          titleText="Fetching Books Data"
        />
      ) : filteredBooks.length ? (
        <div className="grid mx-auto xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:container">
          {filteredBooks.map((item, index) => (
            <Card key={`book-${index + 1}`} book={item} />
          ))}
        </div>
      ) : (
        <div className="container flex items-center justify-center h-full mx-auto">
          <h2 className="mb-2 text-xl font-bold">No Books found</h2>
        </div>
      )}
      {query || totalPages < 1 ? null : (
        <Pagination activePage={page} totalPages={1} />
      )}
    </Layout>
  );
};

export default Home;
