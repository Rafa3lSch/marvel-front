import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import Card from "../components/Card";
import SearchResults from "../components/SearchResults";
import Search from "../components/Search";

const Characters = ({
  search,
  setSearch,
  searchData,
  addFav,
  handleSubmit,
  setSkipChar,
  skipChar,
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    try {
      const fetchData = async () => {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:3005/characters?limit=100&skip=${offset}`
        );
        setData(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [offset]);

  return isLoading ? (
    <>
      <Loader />
    </>
  ) : (
    <div className="characters-search">
      <Search
        handleSubmit={handleSubmit}
        search={search}
        setSearch={setSearch}
      />
      <div className="characters-container">
        {searchData.results && searchData.results.length > 0 ? (
          <SearchResults data={searchData} />
        ) : (
          data.results.map((char, index) => {
            return (
              <Card
                addFav={addFav}
                key={index}
                index={index}
                data={char}
                heart
              />
            );
          })
        )}
      </div>
      {searchData.length === 0 && (
        <div className="button-div">
          {offset !== 0 && (
            <button
              onClick={(event) => {
                if (search.length > 0) {
                  let newSkip = skipChar - 100;
                  setSkipChar(newSkip);
                  handleSubmit(event, newSkip);
                } else {
                  setOffset(offset - 100);
                }
              }}
            >
              Page précédente
            </button>
          )}
          {offset + 100 < data.count && (
            <button
              onClick={(event) => {
                if (search.length > 0) {
                  let newSkip = skipChar + 100;
                  setSkipChar(newSkip);
                  handleSubmit(event, newSkip);
                } else {
                  setOffset(offset + 100);
                }
              }}
            >
              Page suivante
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Characters;
