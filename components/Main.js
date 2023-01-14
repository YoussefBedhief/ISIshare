import { useState } from "react";
import Navbar from "./Navbar";
import Pictures from "./Pictures";

function Main({ user }) {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          user={user}
        />
      </div>
      <div className="h-full">
        <Pictures />
      </div>
    </div>
  );
}

export default Main;
