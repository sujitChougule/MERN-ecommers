import React from "react";
import play from "../../images/playStore.png";
import app from "../../images/appStore.png";
import logo from "../../images/logoLight.png";
import "./Footer.scss";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <div>
          <h4>Download our App</h4>
          <p>Download App for Andriod and ISO mobile phone</p>
        </div>
        <div>
          <img src={play} alt="playStore" />
          <img src={app} alt="playStore" />
        </div>
      </div>
      <div className="midFooter">
        <img src={logo} alt="AppLogo" />
        <p>Your One-Stop Shop</p>
        <p>Copyrights &copy; 2023 SoftKnotch</p>
      </div>
      <div className="rightFooter">
        <h4>Follow us</h4>
        <div>
          <a href="https://github.com/sujitChougule">GitHub</a>
          <a href="https://www.linkedin.com/in/sujit-chougule-259932230/">
            LinkedIn
          </a>
          <a href="https://www.instagram.com/sujit_chougule_7/">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
