import "./Logo.css";
import logo from "./logo.png";
import businessName from "../../info";

function Logo() {
  return (
    <div className="MainLogo">
      <a href="Home" className="Link">
        <img className="Logo" src={logo}></img>
        <div className="LogoText">{businessName}</div>
      </a>
    </div>
  );
}

export default Logo;
