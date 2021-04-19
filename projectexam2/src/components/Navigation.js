import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <>
      <div className="navbar">
        <div className="left">
          <div className="nav__left">
            <Link className="nav__logo" to="/">
              Holidaze
            </Link>
          </div>
        </div>
        <div className="right">
          <div className="nav__menu" id={showMenu ? "" : "hidden"}>
            <ul className="nav__list">
              <Link className="nav__link" to="/">
                <li
                  onClick={() => setShowMenu(!showMenu)}
                  className="nav__item"
                >
                  Home
                </li>
              </Link>
              <Link className="nav__link" to="/hotels">
                <li
                  onClick={() => setShowMenu(!showMenu)}
                  className="nav__item"
                >
                  Hotels
                </li>
              </Link>
              <Link className="nav__link" to="/book">
                <li
                  onClick={() => setShowMenu(!showMenu)}
                  className="nav__item"
                >
                  Book now
                </li>
              </Link>
              <Link className="nav__link" to="/contactus">
                <li
                  onClick={() => setShowMenu(!showMenu)}
                  className="nav__item"
                >
                  Contact
                </li>
              </Link>
              <Link className="nav__link" to="/login">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="login-btn"
                >
                  Login
                </button>
              </Link>
            </ul>
          </div>
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => setShowMenu(!showMenu)}
            className="menu--toggle"
          ></FontAwesomeIcon>
        </div>
      </div>
    </>
  );
};

export default Navigation;
