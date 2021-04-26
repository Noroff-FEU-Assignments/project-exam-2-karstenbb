import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { api_url } from "../utils/Constants";

const Detail = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let history = useHistory();
  const { id } = useParams();

  if (!id) {
    history.push("/hotels");
  }
  const url = api_url + "/hotels/" + id;
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
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
  if (loading) {
    <div>Loading ....</div>;
  }
  if (error) {
    return <div>ERROR: An error occured</div>;
  }

  return (
    <>
      <h1 className="hotel__title">{hotels.title}</h1>
      <div className="detail__container">
        <img
          className="detail__img"
          alt={hotels.title}
          src={hotels.picture}
        ></img>
        <p className="detail__price">{hotels.price} NOK</p>
        <p className="detail__description">{hotels.description}</p>
      </div>
    </>
  );
};

export default Detail;
