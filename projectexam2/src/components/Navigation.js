import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);

  let menu;
  if (showMenu) {
    menu = (
      <>
        <ul className="nav__list">
          <li className="nav__item">
            <Link className="nav__link" to="/">
              Home
            </Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/hotels">
              Hotels
            </Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/book">
              Book now
            </Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/contactus">
              Contact us
            </Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/login">
              <button className="nav__button">Login</button>
            </Link>
          </li>
        </ul>
      </>
    );
  }
  return (
    <div className="nav__container">
      <nav className="nav">
        <div className="nav__content">
          <h1 className="nav__logo">Holidaze</h1>
          <FontAwesomeIcon
            className="home__icon"
            icon={faBars}
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>

        {menu}
      </nav>
    </div>
  );
};

export default Navigation;
