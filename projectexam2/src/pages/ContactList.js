import { useState, useEffect, useContext } from "react";
import { api_url } from "../utils//Constants";
import useAxios from "../utils/useAxios";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";

const ContactList = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const http = useAxios();
  const history = useHistory();
  const [auth] = useContext(AuthContext);
  const [color] = useState("black");

  // Not logged in, sent you back to login page
  if (!auth) {
    history.push("/login");
  }

  // Fetching contact list
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.get(`${api_url}/contacts`);
        setMessages(response.data);
        setLoading(true);
      } catch (error) {
        console.log("error: ", error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Error message
  if (error) {
    return <div>An error occured</div>;
  }
  return (
    <div className="contactlist__body">
      <h1 className="contactlist__title">Messages</h1>
      {loading ? (
        <div className="sweet-loading">
          <ClipLoader color={color} loading={loading} size={150} />
        </div>
      ) : null}
      <div className="message__container">
        {messages?.length === 0 ? (
          <div className="contactlist__empty">No messages found</div>
        ) : null}
        {messages?.map((message) => (
          <div className="message" key={message.id}>
            <div className="message__content">
              <p className="contactlist__item">
                <span className="contactlist__span">Name:</span> {message.name}{" "}
              </p>
              <p className="contactlist__item">
                <span className="contactlist__span">Email:</span>{" "}
                {message.email}{" "}
              </p>
              <p className="contactlist__item">
                <span className="contactlist__span">Message:</span>{" "}
                {message.message}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
