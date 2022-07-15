import { useEffect, useState } from "react";
import { Book } from "interfaces";
import { extractJSON, fetchData, saveJSON } from "utils/helpers";
import { API_ENDPOINT, LOCAL_STORAGE } from "utils/constant";

export const useBooks = () => {
  const [books, setBooks] = useState<Book[] | null>(null);

  // fetches books data if not already present
  useEffect(() => {
    const fetchBooksData = async () => {
      const books = await fetchData(API_ENDPOINT);
      if (books) {
        saveJSON(LOCAL_STORAGE.BOOKS_DATA, books);
        setBooks(books);
      } else {
        setBooks([]);
      }
    };
    if (window) {
      const booksData: Book[] | null = extractJSON(LOCAL_STORAGE.BOOKS_DATA);
      if (booksData) {
        setBooks(booksData);
      } else {
        fetchBooksData();
      }
    }
  }, []);

  return books;
};
