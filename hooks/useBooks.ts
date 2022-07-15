import { useEffect, useState } from "react";
import { Book, BooksCache } from "interfaces";
import { extractJSON, fetchData, saveJSON } from "utils/helpers";
import { API_ENDPOINT, LOCAL_STORAGE } from "utils/constant";
import { useRouter } from "next/router";

type BooksData = Book[] | null;
type TotalPagesCount = number;

export const useBooks = (): [BooksData, TotalPagesCount] => {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [totalPages] = useState(0);
  const router = useRouter();

  // fetches books data if not already present in the cache
  useEffect(() => {
    const fetchBooksData = async () => {
      const page = router.query.page ? Number(router.query.page) : 1;
      const books = await fetchData(API_ENDPOINT);
      const cacheData: BooksCache =
        extractJSON(LOCAL_STORAGE.BOOKS_CACHE) || {};
      cacheData[page] = books || [];
      saveJSON(LOCAL_STORAGE.BOOKS_CACHE, cacheData);
      setBooks(books || []);
    };
    if (window) {
      const page = router.query.page ? Number(router.query.page) : 1;
      const cacheData: BooksCache = extractJSON(LOCAL_STORAGE.BOOKS_CACHE);
      if (!cacheData) {
        fetchBooksData();
      } else {
        const booksData = cacheData[page];
        if (booksData) {
          setBooks(booksData);
        } else {
          fetchBooksData();
        }
      }
    }
  }, [router.query?.page]);

  return [books, totalPages];
};
