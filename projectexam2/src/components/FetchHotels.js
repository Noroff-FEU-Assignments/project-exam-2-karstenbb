import React, { useState, useEffect } from "react";
import { api_url } from "../utils//Constants";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";

const FetchHotels = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [toggles, setToggles] = useState("closed");
  const [color] = useState("black");
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [startdate, setStartDate] = useState(new Date(Date.now() - 86400000));
  const [enddate, setEndDate] = useState(new Date());
  const [success, setSuccess] = useState(null);

  // Schema for booking
  const { handleSubmit, handleChange, register, values } = useFormik({
    initialValues: {
      title: "",
      startdate: startdate,
      enddate: enddate,
      picture: "",
      price: "",
    },
    bookingSchema: yup.object().shape({
      title: yup.string().required(),
      price: yup.number().required(),
      picture: yup.string().required(),
      startdate: yup
        .date()
        .min(new Date(Date.now() - 86400000), "Please enter a date later")
        .required("Please enter a start date"),
      enddate: yup
        .date()
        .min(new Date(Date.now() - 86400000), "Please enter a end date")
        .required("Please enter a end date"),
    }),

    // Onsubmit function that sends values and data to the api
    onSubmit: async (values) => {
      let data = {
        ...modalItem,
        enddate: values.enddate,
        startdate: values.startdate,
      };

      setSubmitting(true);

      // The post request
      try {
        const response = await axios.post(`${api_url}/bookings`, data);
        setSuccess(true);
        setModalItem(response.data);
      } catch (error) {
        console.log("error", error.toString());
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Fetching all the places to stay
  useEffect(() => {
    fetch(api_url + "/hotels")
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

  // The search function that updates the whole site and the typeahead dropdown
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

  // If the filter input is empty, set the useState to false
  const filterInput = document.querySelector(".search");
  if (filterInput === "") {
    setFiltered(false);
  }

  // If filter is true, return this
  if (filtered === true) {
    return (
      <>
        <div className="form-container">
          <form className="form search-container">
            <input
              onChange={handleSearch}
              className="search"
              type="text"
              placeholder="Search places"
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

  // When pressing the book now button, open/close the modal, and put the item inside the modalItem state
  function onBookNow(e, item) {
    setShowModal(!showModal);
    setModalItem(item);
  }

  // Show a loader when the page wait for the content
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
          <form className="form search-container">
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
                <button
                  onClick={(e) => onBookNow(e, item)}
                  className="place__btn place__btn-primary"
                >
                  Book now
                </button>
                <Link
                  className="place__details--link"
                  to={`/detail/${item.id}`}
                  key={item.id}
                >
                  <button className="place__btn">See more</button>
                </Link>
                {showModal && (
                  <>
                    <form onSubmit={handleSubmit} className="container__modal">
                      <div className="modal__header">
                        <h1>Checkout</h1>
                        <button
                          className="modal__close"
                          onClick={() => setShowModal(!showModal)}
                        >
                          X
                        </button>
                      </div>
                      <fieldset className="modal__field" disabled={submitting}>
                        <input
                          onChange={handleChange}
                          name="picture"
                          id="picture"
                          value={modalItem.picture}
                          required
                          type="hidden"
                          ref={register}
                        />
                        <div className="modal__input">
                          <label className="modal__label" htmlFor="title">
                            Title:
                          </label>
                          <input
                            className="modal__input--item"
                            value={modalItem.title}
                            onChange={handleChange}
                            type="text"
                            name="title"
                            id="title"
                            required
                            ref={register}
                          />
                        </div>
                        <div className="modal__input">
                          <label className="modal__label" htmlFor="price">
                            Price in NOK:
                          </label>
                          <input
                            className="modal__input--item"
                            value={modalItem.price}
                            onChange={handleChange}
                            type="number"
                            name="price"
                            id="price"
                            required
                          />
                        </div>
                        <div className="modal__input">
                          <label className="modal__label" htmlFor="startdate">
                            Arrival date:
                          </label>
                          <input
                            className="modal__input--item"
                            onInput={(e) => setStartDate(e.target.value)}
                            value={values.startdate}
                            onChange={handleChange}
                            id="startdate"
                            type="date"
                            name="startdate"
                            required
                          />
                        </div>
                        <div className="modal__input">
                          <label className="modal__label" htmlFor="enddate">
                            Checkout date:
                          </label>
                          <input
                            className="modal__input--item"
                            onInput={(e) => setEndDate(e.target.value)}
                            value={values.enddate}
                            onChange={handleChange}
                            id="enddate"
                            type="date"
                            name="enddate"
                            required
                          />
                        </div>
                        <div className="modal__success">
                          {success ? "Successfully booked place" : ""}
                        </div>
                        <button className="modal__book-btn" type="submit">
                          {submitting ? "Booking ...." : "Book"}
                        </button>
                      </fieldset>
                    </form>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default FetchHotels;
