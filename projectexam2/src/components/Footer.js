import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import { useState } from "react";
const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer__left">
          <span className="footer__email">Holidaze-agency@example.com</span>
          <p className="footer__phonenum">+47 99 999 999</p>
        </div>
        <div className="footer__right">
          <FacebookIcon
            className="footer__facebook"
            onClick={() =>
              (window.location.href =
                "https://www.facebook.com/karsten.bjelde/")
            }
            style={{ fontSize: "40px" }}
          />
          <InstagramIcon
            className="footer__instagram"
            onClick={() =>
              (window.location.href =
                "https://www.instagram.com/karstenbjelde/?hl=nb")
            }
            style={{ fontSize: "40px", marginLeft: "1rem" }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
