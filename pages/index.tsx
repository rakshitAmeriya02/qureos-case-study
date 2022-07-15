import { Book } from "interfaces";
import Card from "components/Card";
import { extractJSON, fetchData, saveJSON } from "utils/helpers";
import { useEffect } from "react";
import { LOCAL_STORAGE } from "utils/constant";
import Layout from "components/Layout";
import Loader from "components/Loader";

interface HomeProps {
  books: Book[] | null;
}

const Home = ({ books }: HomeProps) => {
  useEffect(() => {
    if (window) {
      const booksData = extractJSON(LOCAL_STORAGE.BOOKS_DATA);
      if (!booksData) {
        saveJSON(LOCAL_STORAGE.BOOKS_DATA, books);
      }
    }
  }, []);

  return (
    <Layout>
      {!books ? (
        <Loader
          descriptionText="It might take a while"
          titleText="Fetching Books Data"
        />
      ) : books.length ? (
        <div className="grid xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {books.map((item, index) => (
            <Card key={`book-${index + 1}`} book={item} />
          ))}
        </div>
      ) : (
        <div className="container flex items-center justify-center h-full mx-auto">
          <h2 className="mb-2 text-xl font-bold">No Books found</h2>
        </div>
      )}
    </Layout>
  );
};

export const getStaticProps = async () => {
  let books: Book[] | null = null;
  books = await fetchData(
    "https://run.mocky.io/v3/d7f02fdc-5591-4080-a163-95a08ce6895e"
  );
  return {
    props: {
      books,
    },
  };
};

export default Home;
