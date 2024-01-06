import ListGroup from "react-bootstrap/ListGroup";
import "./List.css";
import React from "react";
import { prayersCalc, dayCalc } from "prayer-timetable-lib";
import TimeTable from "../../Others/TimeTable.json";
import Settings from "../../Others/Settings.json";
import format from "date-fns/format";
import { apiLink } from "../../db/dbFunctions";

export default function Qibla(props) {
  const [location, setLocation] = React.useState({
    latitude: 22,
    longitude: 33,
  });

  function getlocation() {
    fetch(
      "http://api.aladhan.com/v1/qibla/" +
        location.latitude +
        "/" +
        location.longitude,
      {
        method: "GET",
      }
    )
      .then((r) => r.json())
      .then((r) => {
        if (r.code === 200) {
          console.log(r.data);
        }
      });
  }

  return {};
}
