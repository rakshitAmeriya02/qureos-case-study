import { Book } from "@/interfaces";
import Card from "@/components/Card";

interface BookList {
  books: Book[];
}

const BookList = ({ books }: BookList) => {
  return (
    <div className="grid mx-auto xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:container">
      {books.map((item, index) => (
        <Card key={`book-${index + 1}`} book={item} />
      ))}
    </div>
  );
};

export default BookList;
