import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer__left">
          <span className="footer__email">Holidaze-agency@example.com</span>
          <p className="footer__phonenum">+47 99 999 999</p>
        </div>
        <div className="footer__right">
          <FacebookIcon style={{ fontSize: "40px" }} />
          <InstagramIcon style={{ fontSize: "40px", marginLeft: "1rem" }} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
