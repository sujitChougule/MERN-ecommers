import React, { useState } from "react";
import "./Search.scss";
import { ImSearch } from "react-icons/im";
import { useNavigate } from "react-router-dom";
const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    // e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <form className="searchBox" onSubmit={searchSubmitHandler}>
      <input
        type="text"
        className="searchBox"
        placeholder="Search here..."
        onChange={(e) => setKeyword(e.target.value)}
        onClick={searchSubmitHandler}
      />
      <button
        className="searchButtom"
        type="submit"
        onClick={searchSubmitHandler}>
        <ImSearch />
      </button>
    </form>
  );
};

export default Search;
