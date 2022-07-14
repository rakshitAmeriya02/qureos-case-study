import { Book } from "interfaces";
import Card from "components/Card";
import { fetchData } from "utils/helpers";

interface HomeProps {
  books: Book[] | null;
}

const Home = ({ books }: HomeProps) => {
  console.log('books', books)
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
