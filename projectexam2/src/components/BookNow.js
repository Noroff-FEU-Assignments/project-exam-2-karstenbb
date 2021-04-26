import { useState, useEffect } from "react";
import axios from "axios";
import { api_url } from "../utils/Constants";

const BookNow = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState([]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
        <div className="container__calendar">
          <input
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
          ></input>
          <input
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
          ></input>
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
