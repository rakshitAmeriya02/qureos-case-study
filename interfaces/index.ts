interface Published {
  $date: string;
  price: number;
  currency: string;
}

export interface Book {
  title: string;
  isbn: string;
  pageCount: number;
  published: Published;
  thumbnailUrl: string;
  shortDescription: string;
  longDescription: string;
  status: string;
  authors: string[];
  categories: string[];
}
