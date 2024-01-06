import "./MobileNav.css";
import { House, Clock, People, Telephone, Gear } from "react-bootstrap-icons";
import React from "react";

function MobileNav(prams) {
  const [currentBT, setCurrentBT] = React.useState(window.location.href);

  React.useEffect(() => {
    setCurrentBT(window.location.href);
  }, [window.location.href]);

  return (
    <nav className="NavMain">
      <a href="Home">
        <button
          className={
            currentBT.search("Home") > 0 ? "Buttons Selected" : "Buttons"
          }
        >
          <House />
        </button>
      </a>
      <a href="PrayerTimes">
        <button
          className={
            currentBT.search("PrayerTimes") > 0 ? "Buttons Selected" : "Buttons"
          }
        >
          <Clock />
        </button>
      </a>
      {/*  <a href="About">
        <button
          className={
            currentBT.search("About") > 0 ? "Buttons Selected" : "Buttons"
          }
        >
          <People />
        </button>
      </a>
      <a href="ContactUs">
        <button
          className={
            currentBT.search("ContactUs") > 0 ? "Buttons Selected" : "Buttons"
          }
        >
          <Telephone />
        </button>
      </a> */}
      <a href="Settings">
        <button
          className={
            currentBT.search("Settings") > 0 ? "Buttons Selected" : "Buttons"
          }
        >
          <Gear />
        </button>
      </a>
    </nav>
  );
}

export default MobileNav;
