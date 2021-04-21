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
    history.push("/");
  }
  const url = api_url + "/" + id;
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
    <div>
      <h1 className="place__title">{hotels.title}</h1>
      <img className="place__img" alt={hotels.title} src={hotels.picture}></img>
      <p>{hotels.description}</p>
    </div>
  );
};

export default Detail;
