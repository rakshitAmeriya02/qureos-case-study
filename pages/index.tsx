import { Book } from "interfaces";
import Card from "components/Card";
import { fetchData } from "utils/helpers";
import { useEffect } from "react";
import { LOCAL_STORAGE } from "utils/constant";

interface HomeProps {
  books: Book[] | null;
}

const Home = ({ books }: HomeProps) => {
  useEffect(() => {
    if (window) {
      const booksData = localStorage.getItem(LOCAL_STORAGE.BOOKS_DATA);
      if (!booksData) {
        localStorage.setItem(LOCAL_STORAGE.BOOKS_DATA, JSON.stringify(books));
      }
    }
  }, []);

  return (
    <div className="p-4">
      <div className="grid xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {(books || []).map((item, index) => (
          <Card key={`book-${index + 1}`} book={item} />
        ))}
      </div>
    </div>
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
