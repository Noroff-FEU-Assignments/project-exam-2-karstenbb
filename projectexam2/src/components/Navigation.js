import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);

  let menu;
  if (showMenu) {
    menu = (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/hotels">Hotels</Link>
        </li>
        <li>
          <Link to="/book">Book now</Link>
        </li>
        <li>
          <Link to="/contactus">Contact us</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    );
  }
  return (
    <nav>
      <FontAwesomeIcon icon={faBars} onClick={() => setShowMenu(!showMenu)} />
      {menu}
    </nav>
  );
};

export default Navigation;
