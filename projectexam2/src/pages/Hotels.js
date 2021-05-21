import React from "react";
import FetchHotels from "../components/FetchHotels";

const Hotels = () => {
  return (
    <div className="hotel__body">
      <h1 className="hotel__title">Places to stay</h1>

      <div>
        <FetchHotels></FetchHotels>
      </div>
    </div>
  );
};

export default Hotels;
