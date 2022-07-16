interface Published {
  $date: string;
  price: number;
  currency: string;
}

export interface Book {
  title: string;
  isbn: string | null;
  pageCount: number | null;
  published?: Published | null;
  thumbnailUrl: string | null;
  shortDescription: string | null;
  longDescription: string | null;
  status: string | null;
  authors: string[] | null;
  categories: string[] | null;
}

export interface BooksCache {
  [page: number]: Book[] | null;
}
