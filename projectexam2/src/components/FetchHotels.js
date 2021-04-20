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
        <input
          type="text"
          className="search"
          name="query"
          onChange={handleSearch}
        ></input>
        {filteredHotels.map((hotel) => {
          return (
            <>
              <div className="place" key={hotel.id}>
                <h1 key={hotel.id}>{hotel.title}</h1>
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
              placeholder="Search for places"
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
                <p className="place__price">{item.price}</p>
              </div>
              <Link to="/specific:id">
                <button>See more</button>
              </Link>
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default FetchHotels;
