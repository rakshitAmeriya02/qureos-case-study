import SearchBar from "./SearchBar";

const HeaderBar = () => {
  return (
    <div className="min-h-[70px] w-full py-3 px-4">
      <div className="container mx-auto">
        <SearchBar />
      </div>
    </div>
  );
};

export default HeaderBar;
