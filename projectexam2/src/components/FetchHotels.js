import React, { useState, useEffect } from "react";
import { api_url } from "../utils//Constants";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const FetchHotels = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [toggles, setToggles] = useState("closed");
  const [color, setColor] = useState("black");

  useEffect(() => {
    fetch(api_url + "/hotels")
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
  function handleSearch(e) {
    let filterHotels = places.filter((place) => {
      return place.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFiltered(true);
    setFilteredHotels(filterHotels);
    if (e.target.value === "") {
      setToggles("closed");
    } else {
      setToggles("open");
    }

    if (filterHotels.length === 0) {
      setToggles("closed");
    }
  }
  const filterInput = document.querySelector(".search");
  if (filterInput === "") {
    setFiltered(false);
  }

  if (filtered === true) {
    return (
      <>
        <div className="form-container">
          <form className="form">
            <input
              onChange={handleSearch}
              className="search"
              type="text"
              placeholder="Search for places"
            ></input>
            <div className={toggles}>
              {filteredHotels.map((hotel) => {
                return (
                  <div className="place__filter" key={hotel.id}>
                    <Link
                      className="place__details--link"
                      to={`/detail/${hotel.id}`}
                    >
                      <p>{hotel.title}</p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </form>
        </div>
        <div className="container">
          {filteredHotels.map((hotel) => {
            return (
              <div className="place" key={hotel.id}>
                <img
                  className="place__img"
                  alt={hotel.title}
                  src={hotel.picture}
                />
                <h1 className="place__title">{hotel.title}</h1>{" "}
                <div className="place__info">
                  <p className="place__recommendeed">
                    {hotel.recommended ? "recommended" : "not recommended"}
                  </p>
                  <p className="place__price">{hotel.price} NOK</p>
                </div>
                <div className="place__details">
                  <Link
                    className="place__details--link"
                    to={`/detail/${hotel.id}`}
                  >
                    <button className="place__btn">See more</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  if (loading === true) {
    return (
      <div className="sweet-loading">
        <ClipLoader color={color} loading={loading} size={150} />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <div className="form-container">
          <form className="form">
            <input
              onChange={handleSearch}
              className="search"
              type="text"
              placeholder="Search places"
            ></input>
          </form>
        </div>
        <div className="container">
          {places.map((item) => (
            <div className="place" key={item.id}>
              <img className="place__img" alt={item.title} src={item.picture} />
              <h1 className="place__title">{item.title}</h1>{" "}
              <div className="place__info">
                <p className="place__recommendeed">
                  {item.recommended ? "recommended" : "not recommended"}
                </p>
                <p className="place__price">{item.price} NOK</p>
              </div>
              <div className="place__details">
                <Link
                  className="place__details--link"
                  to={`/detail/${item.id}`}
                  key={item.id}
                >
                  <button className="place__btn">See more</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default FetchHotels;
