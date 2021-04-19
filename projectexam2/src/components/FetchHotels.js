import React, { useState, useEffect } from "react";
import { api_url } from "../utils//Constants";
const FetchHotels = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch(api_url)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(true);
          setPlaces(result);
        },
        (error) => {
          setLoading(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!setLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div>
          {places.map((item) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </div>
      </>
    );
  }
};

export default FetchHotels;
