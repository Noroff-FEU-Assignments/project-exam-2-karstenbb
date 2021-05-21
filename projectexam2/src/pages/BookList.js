import React, { useState, useEffect, useContext } from "react";
import { api_url } from "../utils//Constants";
import ClipLoader from "react-spinners/ClipLoader";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
const BookList = () => {
  const [, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [color] = useState("black");
  const [auth] = useContext(AuthContext);
  const history = useHistory();

  if (!auth) {
    history.push("/login");
  }

  useEffect(() => {
    fetch(api_url + "/bookings")
      .then((res) => res.json())
      .then(
        (result) => {
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
  if (places.length === 0) {
    return (
      <div className="booklist__body">
        <h1 className="booklist__title">List of enquiries</h1>
        <div className="booklist__container">
          <div className="booklist__empty">
            No one have booked anything yet :(
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="booklist__title">List of enquiries</h1>
      <div className="booklist__body">
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
      </div>
    </>
  );
};

export default BookList;
