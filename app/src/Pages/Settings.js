import DropDown from "../Components/DropDown/DropDown";
import "./css/Settings.css";
import ListGroup from "react-bootstrap/ListGroup";
import React, { version, useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  People,
  Telephone,
  Chat,
  BoxArrowRight,
  BoxArrowInRight,
} from "react-bootstrap-icons";
import { logout, login, compareVersionNumber } from "../Fun/User";
import { appVersion } from "../info";
import {
  getTimeFormat_localDb,
  setLang,
  setTimeFormat_localDb,
} from "../db/local_db";
import LanguageSwitcher from "../translation/LanguageSwitcher";
import { getLang } from "../db/local_db";

export default function Settings(props) {
  var timeFormat = getTimeFormat_localDb();
  const [language, setLanguage] = useState(getLang());

  const defaultTimeFormat = [
    { name: "24h", value: "24h" },
    { name: "12h", value: "12h" },
  ];

  const languageData = [
    { name: "English", value: "en" },
    { name: "العربية", value: "ar" },
  ];

  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    setLang(language);
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <div className="Settings">
      <ListGroup horizontal>
        <ListGroup.Item className="ListItem">Time Format:</ListGroup.Item>
        <ListGroup.Item className="ListItem">
          <DropDown
            name={timeFormat ? timeFormat : "Select Format"}
            data={defaultTimeFormat}
            results={(time) => setTimeFormat_localDb(time)}
          />
        </ListGroup.Item>
      </ListGroup>
      <ListGroup horizontal>
        <ListGroup.Item className="ListItem">Language</ListGroup.Item>
        <ListGroup.Item className="ListItem">
          <DropDown
            name={languageData.map(
              (item) => item.value === language && item.name
            )}
            data={languageData}
            results={(e) => setLanguage(e)}
          />
        </ListGroup.Item>
      </ListGroup>

      <div className="ContactListDiv">
        <ListGroup>
          <ListGroup.Item className="ContactListItem">
            <Link to="/About">
              <People
                style={{
                  color: "green",
                  fontSize: "20px",
                  marginRight: "20px",
                }}
              />
              About Us
            </Link>{" "}
          </ListGroup.Item>
          <ListGroup.Item className="ContactListItem">
            <Link to="/ContactUs">
              <Telephone
                style={{
                  color: "green",
                  fontSize: "20px",
                  marginRight: "20px",
                }}
              />
              Contact Us
            </Link>{" "}
          </ListGroup.Item>
          <ListGroup.Item className="ContactListItem">
            <Link to="/Feedback">
              <Chat
                style={{
                  color: "green",
                  fontSize: "20px",
                  marginRight: "20px",
                }}
              />
              Feedback
            </Link>{" "}
          </ListGroup.Item>
          <ListGroup.Item
            className="ContactListItem"
            style={{
              color: "Green",
              display: props.user.isSignedIn === false ? "" : "none",
            }}
            onClick={() => navigate("/Login")}
          >
            <BoxArrowInRight
              style={{
                color: "Green",
                fontSize: "20px",
                marginRight: "20px",
              }}
            />
            Login
          </ListGroup.Item>
          <ListGroup.Item
            className="ContactListItem"
            style={{
              color: "red",
              display: props.user.isSignedIn === true ? "" : "none",
            }}
            onClick={() => logout()}
          >
            <BoxArrowRight
              style={{
                color: "red",
                fontSize: "20px",
                marginRight: "20px",
              }}
            />
            Logout
          </ListGroup.Item>
          <ListGroup.Item
            className="ContactListItem"
            style={{
              color: "green",
              display: props.user.isSignedIn === true ? "" : "none",
            }}
            onClick={() => navigate("/FeedbackReview")}
          >
            Feedback Review
          </ListGroup.Item>
        </ListGroup>
        <strong>App Version: {appVersion}</strong>
      </div>
    </div>
  );
}
