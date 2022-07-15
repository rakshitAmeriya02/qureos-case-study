import { useRouter } from "next/router";
import SearchBar from "./SearchBar";

const HeaderBar = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push({
      pathname: "/",
    });
  };
  return (
    <div className="min-h-[70px] w-full py-3 px-4 shadow-xl">
      <div className="flex items-center justify-between mx-auto lg:container">
        <button
          className="px-8 py-3 font-bold text-gray-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
          type="button"
          onClick={handleClick}
        >
          Home
        </button>
        <SearchBar />
      </div>
    </div>
  );
};

export default HeaderBar;
