import ListGroup from "react-bootstrap/ListGroup";
import "./List.css";
import React from "react";
import { prayersCalc, dayCalc } from "prayer-timetable-lib";
import TimeTable from "../../Others/TimeTable.json";
import Settings from "../../Others/Settings.json";
import format from "date-fns/format";
import { apiLink } from "../../db/dbFunctions";

function HorizontalList(props) {
  const [data, setData] = React.useState(null);
  const [prayerToChange, setPrayerToChange] = React.useState({
    Name: "",
    Time: "",
  });

  const [prayersData, setPrayersData] = React.useState(
    prayersCalc(TimeTable, Settings, false)
  );

  const setChangedTime = (e) => {
    if (
      e.target.value.length === 2 &&
      e.nativeEvent.inputType != "deleteContentBackward"
    ) {
      setPrayerToChange({
        Name: prayerToChange.Name,
        Time: e.target.value + ":",
      });
    } else {
      setPrayerToChange({ Name: prayerToChange.Name, Time: e.target.value });
    }
  };

  setInterval(updateTime, 1000);

  //get iqama time from DB
  React.useEffect(() => {
    getPrayerTimes();
  }, []);

  const getPrayerTimes = () => {
    fetch(apiLink("prayerTimes"))
      .then((res) => res.json())
      .then((d) => setData(d));
  };

  const updatePrayerTime = (event) => {
    fetch(apiLink("updatePrayerTime"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: prayerToChange.Name,
        Time: prayerToChange.Time,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.message === true) {
          getPrayerTimes();
          setPrayerToChange({ Name: "", Time: "" });
        } else {
          console.log("Error");
        }
      });
  };

  return (
    <>
      <ListGroup horizontal key={"Title"}>
        <ListGroup.Item
          className="Title"
          style={{
            "--TimeLeft": prayersData.percentage + "%",
          }}
        >
          {prayersData.next.name +
            " in " +
            convertSecondsToHMS(prayersData.countDown.duration)}
        </ListGroup.Item>
      </ListGroup>
      <ListGroup horizontal>
        <ListGroup.Item className="ListPos">
          <strong>Prayer</strong>
        </ListGroup.Item>
        <ListGroup.Item className="TimePos">
          <strong>Adhan</strong>
        </ListGroup.Item>
        <ListGroup.Item className="TimePos">
          <strong>Iqamah</strong>
        </ListGroup.Item>
      </ListGroup>
      {prayersData.prayers.today.map((item, index) =>
        index < 6 ? (
          <ListGroup horizontal key={item.name}>
            <ListGroup.Item
              className={
                item.name.toUpperCase() ===
                prayersData.current.name.toUpperCase()
                  ? "ListPos selected1"
                  : "ListPos"
              }
            >
              {item.name}
            </ListGroup.Item>
            <ListGroup.Item
              className={
                item.name.toUpperCase() ===
                prayersData.current.name.toUpperCase()
                  ? "TimePos selected2"
                  : "TimePos"
              }
            >
              {format(prayersData.prayers.today[index].time, "HH:mm")}
            </ListGroup.Item>
            <ListGroup.Item
              className={
                item.name.toUpperCase() ===
                prayersData.current.name.toUpperCase()
                  ? "TimePos selected2"
                  : "TimePos"
              }
              type="input"
              onClick={() => {
                if (item.name !== "shurooq") {
                  prayerToChange.Name === item.name &&
                  props.user.userType === "Admin"
                    ? setPrayerToChange({ Name: "", Time: "" })
                    : setPrayerToChange({ Name: item.name, Time: item.Iqamah });
                } else {
                }
              }}
              active={
                prayerToChange.Name === item.name &&
                props.user.userType === "Admin" &&
                item.name !== "shurooq"
                  ? true
                  : false
              }
            >
              {data != null ? data[index].Iqamah : ""}
            </ListGroup.Item>
          </ListGroup>
        ) : (
          ""
        )
      )}
      <ListGroup horizontal>
        <ListGroup.Item
          onClick={() => {
            prayerToChange.Name === "Jummuah" && props.user.userType === "Admin"
              ? setPrayerToChange({ Name: "", Time: "" })
              : setPrayerToChange({ Name: "Jummuah", Time: data[6].Iqamah });
          }}
          active={
            prayerToChange.Name === "Jummuah" && props.user.userType === "Admin"
              ? true
              : false
          }
          style={{ width: "100%", textAlign: "center", userSelect: "none" }}
        >
          <strong>
            Jummuah prayer is fixed at {data != null ? data[6].Iqamah : ""}
          </strong>
        </ListGroup.Item>
      </ListGroup>
      <div
        className="TimeChange"
        style={{ display: props.user.userType === "Admin" ? "" : "none" }}
      >
        <p className="TimeInputText">
          {prayerToChange.Name
            ? "Changing Time for " + prayerToChange.Name
            : "Click on iqamah time to change it"}
        </p>
        <div style={{ display: prayerToChange.Name === "" ? "none" : "" }}>
          <input
            className="TimeInput"
            id="time"
            maxLength={5}
            placeholder="10:23"
            value={prayerToChange.Time}
            onChange={setChangedTime}
          />
          <button className="TimeButton" onClick={updatePrayerTime}>
            Set
          </button>
        </div>
      </div>
    </>
  );

  function convertSecondsToHMS(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  function updateTime() {
    setPrayersData(prayersCalc(TimeTable, Settings, false));
  }
}

export default HorizontalList;
