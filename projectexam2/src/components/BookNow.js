import { useState, useEffect } from "react";
import axios from "axios";
import { api_url } from "../utils/Constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookNow = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState([]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(start, end);
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${api_url}/hotels`);
        console.log(response.data);
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
    console.log(place);
  }, []);
  if (loading) {
    return <div>Loading ....</div>;
  }
  if (error) {
    <div>ERROR: An error happened</div>;
  } else {
    return (
      <>
        <div className="container__calendar">
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        </div>
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
                <button className="place__btn">Book now</button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default BookNow;
