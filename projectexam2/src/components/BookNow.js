import { useState, useEffect } from "react";
import axios from "axios";
import { api_url } from "../utils/Constants";
import { useFormik } from "formik";
import * as yup from "yup";

import ClipLoader from "react-spinners/ClipLoader";

const BookNow = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [startdate, setStartDate] = useState(new Date());
  const [enddate, setEndDate] = useState(new Date());
  const [color, setColor] = useState("black");
  const [success, setSuccess] = useState(null);

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
    onSubmit: async (values) => {
      let data = {
        ...modalItem,
        enddate: values.enddate,
        startdate: values.startdate,
      };

      setSubmitting(true);

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

  function onBookNow(item, e) {
    setShowModal(!showModal);
    setModalItem(item);
  }
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${api_url}/hotels`);

        if (response.status === 200) {
          setPlace(response.data);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);
  if (loading) {
    return (
      <div className="sweet-loading">
        <ClipLoader color={color} loading={loading} size={150} />
      </div>
    );
  }
  if (error) {
    <div>ERROR: An error happened</div>;
  } else {
    return (
      <>
        <div className="container">
          {place.map((item) => (
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
                  onClick={(e) => onBookNow(item, e)}
                  className="place__btn"
                >
                  Book now
                </button>
              </div>
            </div>
          ))}
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
  }
};

export default BookNow;
