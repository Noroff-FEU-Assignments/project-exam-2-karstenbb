import React, { useState, useEffect } from "react";
import { api_url } from "../utils//Constants";
import ClipLoader from "react-spinners/ClipLoader";

const BookList = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [color, setColor] = useState("black");

  useEffect(() => {
    fetch(api_url + "/bookings")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setLoading(false);
          setPlaces(result);
        },
        (error) => {
          setLoading(true);
          setError(error);
        }
      );
  }, []);
  if (loading) {
    return (
      <div className="sweet-loading">
        <ClipLoader color={color} loading={loading} size={150} />
      </div>
    );
  }
  return (
    <>
      <h1 className="booklist__title">List of enquiries</h1>
      <div className="booklist__container">
        {places.map((place) => {
          return (
            <div className="booklist__item" key={place.id}>
              <h1 className="booklist__item--title">{place.title}</h1>
              <p className="booklist__item--startdate">
                Arrival date: {place.startdate}
              </p>
              <p className="booklist__item--enddate">
                Checkout date: {place.enddate}
              </p>
              <img
                className="booklist__img"
                src={place.picture}
                alt={place.title}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BookList;
