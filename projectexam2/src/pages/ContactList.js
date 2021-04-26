import { useState, useEffect } from "react";
import { api_url } from "../utils//Constants";
import useAxios from "../utils/useAxios";

const ContactList = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const http = useAxios();
  useEffect(async () => {
    try {
      const response = await http.get(`${api_url}/contacts`);
      setMessages(response.data);
      setLoading(true);
      console.log(response.data);
    } catch (error) {
      console.log("error: ", error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          <div>
            <p>Name: {message.name} </p>
            <p>Email: {message.email} </p>
            <p>Message: {message.message} </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactList;
