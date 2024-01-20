import DropDown from "../Components/DropDown/DropDown";
import "./css/Settings.css";
import ListGroup from "react-bootstrap/ListGroup";
import React from "react";
import { useNavigate } from "react-router-dom";

import {
  People,
  Telephone,
  BoxArrowRight,
  BoxArrowInRight,
} from "react-bootstrap-icons";
import { logout, login } from "../Fun/User";

export default function Settings(props) {
  const [defaultPage, setDefaultPage] = React.useState(
    localStorage.getItem("defaultPage").substring(1)
  );
  const [timeFormat, setTimeFormat] = React.useState(
    localStorage.getItem("timeFormat")
  );
  const defaultPageData = [
    { name: "Home", value: "/Home" },
    { name: "Prayer Times", value: "/PrayerTimes" },
  ];
  const defaultTimeFormat = [
    { name: "24h", value: "24h" },
    { name: "12h", value: "12h" },
  ];

  const storeDefaultPage = (data) => {
    localStorage.setItem("defaultPage", data);
  };

  const storeTimeFormat = (data) => {
    localStorage.setItem("timeFormat", data);
  };

  const navigate = useNavigate();

  return (
    <div className="Settings">
      {/*   <ListGroup horizontal>
        <ListGroup.Item className="ListItem">
          <p>Dark Mode</p>
        </ListGroup.Item>
      </ListGroup> */}
      {/*     <ListGroup horizontal>
        <ListGroup.Item className="ListItem">Default Page</ListGroup.Item>
        <ListGroup.Item className="ListItem">
          <DropDown
            name={defaultPage}
            data={defaultPageData}
            results={storeDefaultPage}
          />
        </ListGroup.Item>
      </ListGroup> */}
      <ListGroup horizontal>
        <ListGroup.Item className="ListItem">Time Format:</ListGroup.Item>
        <ListGroup.Item className="ListItem">
          <DropDown
            name={timeFormat ? timeFormat : "Select Format"}
            data={defaultTimeFormat}
            results={storeTimeFormat}
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
            <a href="About">
              <People
                style={{
                  color: "green",
                  fontSize: "20px",
                  marginRight: "20px",
                }}
              />
              About Us
            </a>
          </ListGroup.Item>
          <ListGroup.Item className="ContactListItem">
            <a href="ContactUs">
              <Telephone
                style={{
                  color: "green",
                  fontSize: "20px",
                  marginRight: "20px",
                }}
              />
              Contact Us
            </a>
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
      </div>
    </div>
  );
}
