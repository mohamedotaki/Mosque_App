import "./Logo.css";
import logo from "./logo-trans.png";
import { businessName } from "../../info";
import { useTranslation } from "react-i18next";

function Logo() {
  const { t } = useTranslation();

  return (
    <div className="MainLogo">
      <a href="Home" className="Link">
        <img className="Logo" src={logo} alt="Logo"></img>
        <div className="LogoText">{t(businessName)}</div>
      </a>
    </div>
  );
}

export default Logo;
