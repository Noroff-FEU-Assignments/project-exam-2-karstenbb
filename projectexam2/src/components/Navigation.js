import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navigation = () => {
  const [hideMenu, sethideMenu] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

  // The logout button function, toggle the menu, and set the auth useState to null
  function logOut() {
    setAuth(null);
    sethideMenu(!hideMenu);
  }

  // When resizing the page, it changes the state to false, so the mobile menu are not open all the time
  window.onresize = () => {
    if (window.innerWidth >= 610) {
      sethideMenu(false);
    }
  };
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
          <div className="nav__menu" id={hideMenu ? "hidden" : ""}>
            <ul className="nav__list">
              // I use navlink because I saw in the documentation that there was
              an "activeStyle" I could style myself there
              <NavLink
                // I have an onClick on every link in the menu, so when pressed it toggles the mobile menu
                onClick={() => sethideMenu(!hideMenu)}
                activeStyle={{ borderBottom: "2px solid black" }}
                className="nav__link"
                exact
                to="/"
              >
                <li
                  onClick={() => sethideMenu(!hideMenu)}
                  className="nav__item"
                >
                  Home
                </li>
              </NavLink>
              <NavLink
                onClick={() => sethideMenu(!hideMenu)}
                activeStyle={{ borderBottom: "2px solid black" }}
                className="nav__link"
                to="/hotels"
              >
                <li
                  onClick={() => sethideMenu(!hideMenu)}
                  className="nav__item"
                >
                  Hotels
                </li>
              </NavLink>
              <NavLink
                onClick={() => sethideMenu(!hideMenu)}
                activeStyle={{ borderBottom: "2px solid black" }}
                className="nav__link"
                to="/contactus"
              >
                <li
                  onClick={() => sethideMenu(!hideMenu)}
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
                    onClick={() => sethideMenu(!hideMenu)}
                    activeStyle={{ borderBottom: "2px solid black" }}
                    className="nav__link"
                    to="/booklist"
                  >
                    <li
                      onClick={() => sethideMenu(!hideMenu)}
                      className="nav__item"
                    >
                      Enquiries
                    </li>
                  </NavLink>
                  <NavLink
                    onClick={() => sethideMenu(!hideMenu)}
                    activeStyle={{ borderBottom: "2px solid black" }}
                    className="nav__link"
                    to="/contactlist"
                  >
                    <li
                      onClick={() => sethideMenu(!hideMenu)}
                      className="nav__item"
                    >
                      Messages
                    </li>
                  </NavLink>
                  <NavLink
                    onClick={() => sethideMenu(!hideMenu)}
                    activeStyle={{ borderBottom: "2px solid black" }}
                    className="nav__link"
                    to="/addplace"
                  >
                    <li
                      onClick={() => sethideMenu(!hideMenu)}
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
                    onClick={() => sethideMenu(!hideMenu)}
                    className="login-btn"
                  >
                    Login
                  </button>
                </Link>
              )}
            </ul>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => sethideMenu(!hideMenu)}
              className="menu--toggle"
            ></FontAwesomeIcon>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
