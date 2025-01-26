import DropDown from "../Components/DropDown/DropDown";
import "./css/Settings.css";
import ListGroup from "react-bootstrap/ListGroup";
import React, { version } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

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
  getLang_localDB,
  getTimeFormat_localDb,
  setLang_localDB,
  setTimeFormat_localDb,
} from "../db/local_db";
import { useTranslation } from "react-i18next";

export default function Settings(props) {
  var timeFormat = getTimeFormat_localDb();
  var currentLang = getLang_localDB();
  const { t, i18n } = useTranslation();

  const defaultTimeFormat = [
    { name: "24h", value: "24h" },
    { name: "12h", value: "12h" },
  ];
  const availableLang = [
    { name: "English", value: "en" },
    { name: "العربية", value: "ar" },
  ];

  const navigate = useNavigate();

  const onLangSelect = (lang) => {
    setLang_localDB(lang);
    changeLanguage(lang);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="Settings">
      <ListGroup horizontal>
        <ListGroup.Item className="ListItem">
          {t("Time Format")}:
        </ListGroup.Item>
        <ListGroup.Item className="ListItem">
          <DropDown
            name={timeFormat ? timeFormat : "Select Format"}
            data={defaultTimeFormat}
            results={(time) => setTimeFormat_localDb(time)}
          />
        </ListGroup.Item>
      </ListGroup>
      <ListGroup horizontal>
        <ListGroup.Item className="ListItem">{t("Language")}:</ListGroup.Item>
        <ListGroup.Item className="ListItem">
          <DropDown
            name={
              currentLang
                ? currentLang === "en"
                  ? "English"
                  : "العربية"
                : "Select Format"
            }
            data={availableLang}
            results={(lang) => onLangSelect(lang)}
          />
        </ListGroup.Item>
      </ListGroup>
      {/*       <ListGroup horizontal>
        <ListGroup.Item className="ListItem">Language</ListGroup.Item>
        <ListGroup.Item className="ListItem">
          <DropDown name={"English"} data={languageData} results={""} />
        </ListGroup.Item>
      </ListGroup> */}

      {/*  <ListGroup horizontal>
        <ListGroup.Item className="ListItem">
          <p>Language</p>
        </ListGroup.Item>

        <ListGroup.Item className="ListItem">
          <DropDown name="button" item1="English" item2="Arabic" />
        </ListGroup.Item>
      </ListGroup>

      <ListGroup horizontal>
        <ListGroup.Item className="ListItem">
          <p>Time Format</p>
        </ListGroup.Item>
        <ListGroup.Item className="ListItem">
          <Form>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="24h"
            />
          </Form>
        </ListGroup.Item>
      </ListGroup> */}

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
              {t("About Us")}
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
              {t("Contact Us")}
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
              {t("Feedback")}
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
            {t("Login")}
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
            {t("Logout")}
          </ListGroup.Item>
          <ListGroup.Item
            className="ContactListItem"
            style={{
              color: "green",
              display: props.user.isSignedIn === true ? "" : "none",
            }}
            onClick={() => navigate("/FeedbackReview")}
          >
            {t("Feedback Review")}
          </ListGroup.Item>
        </ListGroup>
        <strong>
          {t("App Version")}: {appVersion}
        </strong>
      </div>
    </div>
  );
}
