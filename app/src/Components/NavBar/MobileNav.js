import "./MobileNav.css";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faGear,
  faCompass,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function MobileNav(prams) {
  const [currentBT, setCurrentBT] = React.useState(window.location.href);
  const { t } = useTranslation();

  const navButtons = [
    { name: t("Home"), icon: faHouse, link: "/Home" },
    { name: t("Prayer Times"), icon: faClock, link: "/PrayerTimes" },
    { name: t("Qibla"), icon: faCompass, link: "/Qibla" },
    { name: t("Settings"), icon: faGear, link: "/Settings" },
  ];

  React.useEffect(() => {
    setCurrentBT(window.location.href);
  }, [window.location.href]);

  const currentTap = useLocation().pathname;

  return (
    <nav className="NavMain">
      {navButtons.map((item) => (
        <Link
          to={item.link}
          key={item.name}
          onClick={() => window.history.replaceState({}, "")}
          className={currentTap === item.link ? "Buttons Selected" : "Buttons"}
        >
          <FontAwesomeIcon icon={item.icon} style={{ fontSize: "25px" }} />
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

export default MobileNav;
