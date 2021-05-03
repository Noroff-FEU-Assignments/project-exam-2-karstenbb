import { useState, useEffect } from "react";
import axios from "axios";
import { api_url } from "../utils/Constants";
import { useFormik } from "formik";
import * as Yup from "yup";

const BookNow = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [Startdate, setStartDate] = useState();
  const [Enddate, setEndDate] = useState();

  const {
    setFieldValue,
    handleSubmit,
    handleChange,
    register,
    values,
    errors,
  } = useFormik({
    initialValues: {
      title: "",
      startdate: Startdate,
      enddate: Enddate,
      picture: "",
      price: "",
    },
    bookingSchema: Yup.object().shape({
      title: Yup.string().required(),
      price: Yup.number().required(),
      picture: Yup.string().required(),
      startdate: Yup.date().required("required"),
      enddate: Yup.date().required("required"),
    }),
    onSubmit: async (bookingSchema, values) => {
      setSubmitting(true);
      console.log(values);
      try {
        const response = await axios.post(
          `${api_url}/bookings`,
          modalItem,
          values
        );
        console.log(response.data);

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
    return <div>Loading ....</div>;
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
              <fieldset disabled={submitting}>
                <input
                  onChange={handleChange}
                  name="picture"
                  id="picture"
                  value={modalItem.picture}
                  required
                />

                <input
                  value={modalItem.title}
                  onChange={handleChange}
                  type="text"
                  name="title"
                  id="title"
                  required
                />
                <input
                  value={modalItem.price}
                  onChange={handleChange}
                  type="number"
                  name="price"
                  id="price"
                  required
                />
                <input
                  onInput={(e) => setStartDate(e.target.value)}
                  value={values.Startdate}
                  onChange={handleChange}
                  placeholder="mm-dd-yyyy"
                  id="startdate"
                  type="date"
                  name="startdate"
                  required
                />
                <input
                  onInput={(e) => setEndDate(e.target.value)}
                  value={values.Enddate}
                  onChange={handleChange}
                  placeholder="mm-dd-yyyy"
                  id="enddate"
                  type="date"
                  name="enddate"
                  required
                />
                <button type="submit">Book</button>
              </fieldset>
            </form>
          </>
        )}
      </>
    );
  }
};

export default BookNow;
