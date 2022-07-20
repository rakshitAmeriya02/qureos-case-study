import { Book } from "@/interfaces";
import axios from "axios";

export async function fetchData(endPoint: string) {
  try {
    const response = await axios.get(endPoint);
    const json = await response.data;
    return json;
  } catch (error) {
    console.log("ERROR:", { error });
    return null;
  }
}

const formatNumber = (num: number) => {
  if (num < 10) {
    return "0" + num;
  }
  return num;
};

export const getFormattedDate = (date: string | null | undefined) => {
  if (date) {
    try {
      const formattedDate = new Date(date);
      const day = formatNumber(formattedDate.getDate());
      const month = formatNumber(formattedDate.getMonth() + 1);
      const year = formattedDate.getFullYear();
      return day + "-" + month + "-" + year;
    } catch {
      return "NA";
    }
  } else {
    return "NA";
  }
};

export const formatCurrency = (
  value: number,
  currency: string,
  decimal = 0
) => {
  return value.toLocaleString("en", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: decimal,
    minimumFractionDigits: decimal,
  });
};

const cloneJSON = (value: string | null) => {
  if (value) {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.log("ERROR:", { error });
      return null;
    }
  }
  return null;
};

export const extractJSON = (key: string) => {
  const value = localStorage.getItem(key);
  return cloneJSON(value);
};

export const saveJSON = (key: string, value: any) => {
  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};

type className = string | boolean | undefined | null;

export const clsx = (...args: className[]) => {
  const classes = args.filter((value) => value).join(" ");
  return classes;
};

export const getSearchString = (book: Book) => {
  const authors = (book.authors || []).join(" ");
  const categories = (book.categories || []).join(" ");
  const title = book.title ?? "";
  const price = book?.published?.price ?? 0;
  const isbn = book.isbn ?? "";
  const searchString =
    `${authors} ${categories} ${title} ${price} ${isbn}`.toLowerCase();
  return searchString;
};
