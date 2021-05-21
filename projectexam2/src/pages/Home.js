import React from "react";
import background from "../images/homebackground.jpeg";

// Straight forward home page
const Home = () => {
  return (
    <>
      <div className="home">
        <h1 className="home__title">Welcome to Holidaze</h1>
        <p className="home__paragraph">
          The art of meeting your <span className="home__border">highest</span>{" "}
          expectations
        </p>
        <img
          className="backgroundPic__home"
          src={background}
          alt="Homebackground"
        />
      </div>
    </>
  );
};

export default Home;
