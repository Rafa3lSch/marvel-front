import React from "react";

const Search = ({ setSearch, search, handleSubmit }) => {
  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Recherche"
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          type="text"
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Search;
