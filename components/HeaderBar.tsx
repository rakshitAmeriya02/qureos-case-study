import { useRouter } from "next/router";
import Button from "@/ui-core/Button";
import SearchBar from "@/components/SearchBar";
import { TEXT } from "@/utils/constant";

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
        <Button variant="text" onClick={handleClick}>
          {TEXT.HOME}
        </Button>
        <SearchBar />
      </div>
    </div>
  );
};

export default HeaderBar;
