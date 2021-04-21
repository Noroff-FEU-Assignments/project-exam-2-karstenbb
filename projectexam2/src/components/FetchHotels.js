import React, { useState, useEffect } from "react";
import { api_url } from "../utils//Constants";
import { Link } from "react-router-dom";

const FetchHotels = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filtered, setFiltered] = useState(false);

  useEffect(() => {
    fetch(api_url)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setLoading(true);
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
          </form>
        </div>
        {filteredHotels.map((hotel) => {
          return (
            <>
              <div className="container" key={hotel.id}>
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
                    <div className="place__details">
                      <Link
                        className="place__details--link"
                        to={`/detail/${hotel.id}`}
                        key={hotel.id}
                      >
                        <button className="place__btn">See more</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loading) {
    return <div>Loading...</div>;
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
