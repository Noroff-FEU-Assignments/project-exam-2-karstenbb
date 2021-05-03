import React from "react";

import FetchHotels from "../components/FetchHotels";

const Hotels = () => {
  return (
    <>
      <h1 className="hotel__title">Places to stay</h1>

      <div>
        <FetchHotels></FetchHotels>
      </div>
    </>
  );
};

export default Hotels;
