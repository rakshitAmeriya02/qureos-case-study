import { Book } from "interfaces";
import { useRouter } from "next/router";
import { useRef } from "react";
import { SingleValue, StylesConfig } from "react-select";
import AsyncSelect from "react-select/async";
import { LOCAL_STORAGE } from "utils/constant";
import { extractJSON, fetchData } from "utils/helpers";

interface BookOption {
  value: string;
  label: string;
}

const SearchBar = () => {
  const router = useRouter();
  const timoutRef = useRef<NodeJS.Timeout | null>(null);

  const loadOptions = (inputValue: string): Promise<BookOption[]> => {
    return new Promise((resolve) => {
      if (timoutRef.current) {
        clearTimeout(timoutRef.current);
      }
      timoutRef.current = setTimeout(async () => {
        try {
          let books: Book[] | null = extractJSON(LOCAL_STORAGE.BOOKS_DATA);
          if (!books) {
            books = await fetchData(
              "https://run.mocky.io/v3/d7f02fdc-5591-4080-a163-95a08ce6895e"
            );
          }
          const options = (books || [])
            .filter((item) => {
              const searchString = `${item.title.toLocaleLowerCase()} ${item.authors
                .join(" ")
                .toLocaleLowerCase()} ${item.isbn}`;
              return searchString.includes(inputValue);
            })
            .map((item) => ({
              value: item.title,
              label: item.title,
            }));
          resolve(options);
        } catch (error) {
          console.log("ERROR:", { error });
          resolve([]);
        }
      }, 1000);
    });
  };

  const handleChange = (newValue: SingleValue<BookOption>) => {
    if (newValue) {
      const { value } = newValue;
      router.push("/" + encodeURI(value));
    }
  };

  const customStyles: StylesConfig<BookOption, false> = {
    container: (base) => ({
      ...base,
      width: 340,
    }),
    input: (base) => ({
      ...base,
      height: 45,
      color: "#000000",
      padding: "6px 10px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#000000",
      padding: "6px 10px",
    }),
    control: (base) => ({
      ...base,
      boxShadow: "inset 0px 1px 1px 1px transparent",
      borderRadius: "10px",
    }),
  };

  return (
    <div>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        onChange={handleChange}
        styles={customStyles}
        placeholder="Search Books..."
      />
    </div>
  );
};

export default SearchBar;