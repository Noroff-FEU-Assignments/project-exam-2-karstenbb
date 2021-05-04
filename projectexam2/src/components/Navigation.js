import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [auth, setAuth] = useContext(AuthContext);

  function logOut() {
    setAuth(null);
    setShowMenu(!showMenu);
  }
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
              <NavLink
                activeStyle={{ borderBottom: "2px solid black" }}
                className="nav__link"
                exact
                to="/"
              >
                <li
                  onClick={() => setShowMenu(!showMenu)}
                  className="nav__item"
                >
                  Home
                </li>
              </NavLink>
              <NavLink
                activeStyle={{ borderBottom: "2px solid black" }}
                className="nav__link"
                to="/hotels"
              >
                <li
                  onClick={() => setShowMenu(!showMenu)}
                  className="nav__item"
                >
                  Hotels
                </li>
              </NavLink>
              <NavLink
                activeStyle={{ borderBottom: "2px solid black" }}
                className="nav__link"
                to="/book"
              >
                <li
                  onClick={() => setShowMenu(!showMenu)}
                  className="nav__item"
                >
                  Book now
                </li>
              </NavLink>
              <NavLink
                activeStyle={{ borderBottom: "2px solid black" }}
                className="nav__link"
                to="/contactus"
              >
                <li
                  onClick={() => setShowMenu(!showMenu)}
                  className="nav__item"
                >
                  Contact
                </li>
              </NavLink>
              {auth ? (
                <>
                  <span className="nav__line2">|</span>
                  <div className="nav__line"></div>
                  <NavLink
                    activeStyle={{ borderBottom: "2px solid black" }}
                    className="nav__link"
                    to="/booklist"
                  >
                    <li
                      onClick={() => setShowMenu(!showMenu)}
                      className="nav__item"
                    >
                      List
                    </li>
                  </NavLink>
                  <NavLink
                    activeStyle={{ borderBottom: "2px solid black" }}
                    className="nav__link"
                    to="/contactlist"
                  >
                    <li
                      onClick={() => setShowMenu(!showMenu)}
                      className="nav__item"
                    >
                      Messages
                    </li>
                  </NavLink>
                  <NavLink
                    activeStyle={{ borderBottom: "2px solid black" }}
                    className="nav__link"
                    to="/addplace"
                  >
                    <li
                      onClick={() => setShowMenu(!showMenu)}
                      className="nav__item"
                    >
                      New establishment
                    </li>
                  </NavLink>
                  <button onClick={logOut} className="login-btn">
                    Logout
                  </button>
                </>
              ) : (
                <Link className="nav__link" to="/login">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="login-btn"
                  >
                    Login
                  </button>
                </Link>
              )}
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
