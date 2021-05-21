import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { api_url } from "../utils/Constants";
import * as yup from "yup";
import { useFormik } from "formik";
import ClipLoader from "react-spinners/ClipLoader";

const Detail = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [startdate, setStartDate] = useState(new Date());
  const [enddate, setEndDate] = useState(new Date());
  const [success, setSuccess] = useState(null);
  const [color] = useState("black");
  const history = useHistory();
  const { id } = useParams();

  // If no ID is found, it will send you back to the hotels page
  if (!id) {
    history.push("/hotels");
  }

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
      startdate: yup.date().required("required"),
      enddate: yup.date().required("required"),
    }),

    // Onsubmit function that sends values and destruct the modalItem state, and put the dates in a variabel to send
    onSubmit: async (values) => {
      let data = {
        ...modalItem,
        enddate: values.enddate,
        startdate: values.startdate,
      };

      setSubmitting(true);

      // The post request with a payload with the data
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

  // Fetching the single place to stay
  const url = api_url + "/hotels/" + id;
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(url);

        if (response.status === 200) {
          setHotels(response.data);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [url]);

  // Show loader when loading
  if (loading) {
    <div className="sweet-loading">
      <ClipLoader color={color} loading={loading} size={150} />
    </div>;
  }

  // Show error if there is one
  if (error) {
    return <div>ERROR: An error occured</div>;
  }
  // The booking function on the details page
  function onBookNow(e) {
    setShowModal(!showModal);
    setModalItem(hotels);
  }
  return (
    <>
      <div className="details__body">
        <h1 className="hotel__title">{hotels.title}</h1>
        <div className="detail__container">
          <img
            className="detail__img"
            alt={hotels.title}
            src={hotels.picture}
          ></img>
          <p className="detail__price">{hotels.price} NOK</p>
          <p className="detail__description">{hotels.description}</p>
          <button onClick={(e) => onBookNow(e, hotels)} className="place__btn">
            Book now
          </button>
        </div>
      </div>
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
                value={values.picture}
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
    </>
  );
};

export default Detail;
