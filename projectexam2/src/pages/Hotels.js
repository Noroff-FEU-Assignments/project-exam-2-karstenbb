import React from "react";
import { api_url } from "../utils/Constants";
import FetchHotels from "../components/FetchHotels";

const Hotels = () => {
  console.log(api_url);
  function handleSearch(e) {
    console.log(e.target.value);
  }
  return (
    <>
      <h1>Hotels</h1>
      <div>
        <form>
          <input
            onChange={handleSearch}
            className="search"
            type="text"
            placeholder="Search for places"
          ></input>
        </form>
      </div>
      <div>
        <FetchHotels></FetchHotels>
      </div>
    </>
  );
};

export default Hotels;
