import "./NavBar.css";
import Logo from "../Logo/Logo";
import { Justify } from "react-bootstrap-icons";
import React from "react";
import { setUser_localDB } from "../../db/local_db";
import { Link, useLocation } from "react-router-dom";

function BasicExample(prams) {
  const [trigger, setTrigger] = React.useState(false);
  const navLinks = [
    { name: "Home", link: "/Home" },
    { name: "About Us", link: "/About" },
    { name: "Contact Us", link: "/ContactUs" },
  ];

  const currentTap = useLocation().pathname;

  return (
    <nav className="NavPos">
      <div>
        <Logo />
      </div>
      <div className="LinksPos">
        {navLinks.map((item) => (
          <Link
            to={item.link}
            key={item.name}
            className={
              currentTap === item.link
                ? "LinksStyle textColor-secondary"
                : "LinksStyle"
            }
          >
            {item.name}
          </Link>
        ))}
        <a
          style={{ display: prams.user.isSignedIn ? "" : "none" }}
          className="LinksStyle"
          href="Home"
          onClick={() => {
            setUser_localDB();
          }}
        >
          Logout
        </a>
      </div>
    </nav>
  );
}

export default BasicExample;
