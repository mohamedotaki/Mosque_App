import "./NavBar.css";
import Logo from "../Logo/Logo";
import { Justify } from "react-bootstrap-icons";
import React from "react";

function BasicExample(prams) {
  const [trigger, setTrigger] = React.useState(false);

  return (
    <nav className="NavPos">
      <div className="Logo">
        <Logo />
      </div>
      <div className="LinksPos">
        <a className="LinksStyle" href="Home">
          Home
        </a>
        <a className="LinksStyle hidden" href="PrayerTimes">
          PrayerTimes
        </a>
        {/* <a className="LinksStyle" href="Donation">
          Donation
        </a> */}
        <a className="LinksStyle" href="About">
          About Us
        </a>
        <a className="LinksStyle" href="ContactUs">
          Contact Us
        </a>
        <a
          style={{ display: prams.user.isSignedIn ? "" : "none" }}
          className="LinksStyle"
          href="Home"
          onClick={() => {
            localStorage.setItem(
              "user",
              JSON.stringify({
                userType: "User",
                isSignedIn: false,
                token: null,
              })
            );
          }}
        >
          Logout
        </a>
      </div>
    </nav>
  );
}

export default BasicExample;
