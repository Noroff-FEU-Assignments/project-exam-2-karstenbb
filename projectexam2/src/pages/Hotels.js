import React from "react";
import { api_url } from "../utils/Constants";
import FetchHotels from "../components/FetchHotels";

const Hotels = () => {
  console.log(api_url);

  return (
    <>
      <h1>Hotels</h1>

      <div>
        <FetchHotels></FetchHotels>
      </div>
    </>
  );
};

export default Hotels;
