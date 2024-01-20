import ListGroup from "react-bootstrap/ListGroup";
import "./List.css";
import React from "react";
import { prayersCalc, dayCalc } from "prayer-timetable-lib";
import TimeTable from "../../Others/TimeTable.json";
import Settings from "../../Others/Settings.json";
import format from "date-fns/format";
import { getPrayerTimes, updatePrayerTime } from "../../db/dbFunctions";
import { parseISO } from "date-fns";
import DropDown from "../DropDown/DropDown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function HorizontalList(props) {
  const [oneAPICall, setOneAPICall] = React.useState(null);

  const [timeFormat, setTimeFormat] = React.useState(
    localStorage.getItem("timeFormat")
  );
  const [data, setData] = React.useState(null);
  const [offsetTime, setOffsetTime] = React.useState(false);

  const [prayerToChange, setPrayerToChange] = React.useState({
    Name: "",
    Time: "",
    Offset: "",
  });
  const [prayersData, setPrayersData] = React.useState(
    prayersCalc(TimeTable, Settings, false)
  );
  const [prayersToShow, setPrayerToShow] = React.useState(
    prayersData.isAfterIsha
      ? prayersData.prayers.tomorrow
      : prayersData.prayers.today
  );

  const setChangedTime = (e) => {
    if (offsetTime && prayerToChange.Name !== "Jummuah") {
      setPrayerToChange({
        Name: prayerToChange.Name,
        Time: "",
        Offset: e.target.value,
      });
    } else {
      if (
        e.target.value.length === 2 &&
        e.nativeEvent.inputType !== "deleteContentBackward" &&
        !offsetTime
      ) {
        setPrayerToChange({
          Name: prayerToChange.Name,
          Time: e.target.value + ":",
          Offset: "",
        });
      } else {
        setPrayerToChange({
          Name: prayerToChange.Name,
          Time: e.target.value,
          Offset: "",
        });
      }
    }
  };

  function storeIqamahTimes(data) {
    localStorage.setItem("IqamahTimes", JSON.stringify(data));
  }

  const storeTimeFormat = (data) => {
    localStorage.setItem("timeFormat", data);
    setTimeFormat(data);
  };

  if (!timeFormat) {
    storeTimeFormat("12h");
  }

  setInterval(updateTime, 1000);

  React.useEffect(() => {
    // localStorage.setItem("LastUpdate", new Date().getTime());
    navigator.onLine
      ? getPrayerTimes().then((result) => {
          setData(result);
          if (result !== null) storeIqamahTimes(result);
        })
      : localStorage.getItem("IqamahTimes") !== "undefined"
      ? setData(JSON.parse(localStorage.getItem("IqamahTimes")))
      : console.log("connect to inernect");
  }, []);

  return (
    <>
      <div className="TimeFormat">
        <button
          className={
            timeFormat === "24h" ? "selected TimeFormat24 " : "TimeFormat24"
          }
          onClick={() => storeTimeFormat("24h")}
        >
          24h
        </button>
        <button
          className={
            timeFormat === "12h" ? "selected TimeFormat12 " : "TimeFormat12"
          }
          onClick={() => storeTimeFormat("12h")}
        >
          12h
        </button>
      </div>
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
      {prayersToShow.map((item, index) =>
        index < 6 ? (
          <ListGroup horizontal key={item.name}>
            <ListGroup.Item
              className={
                item.name.toUpperCase() ===
                prayersData.current.name.toUpperCase()
                  ? "ListPos"
                  : "ListPos"
              }
            >
              {item.name[0].toUpperCase() + item.name.slice(1)}
            </ListGroup.Item>
            <ListGroup.Item
              className={
                item.name.toUpperCase() ===
                prayersData.current.name.toUpperCase()
                  ? "TimePos "
                  : "TimePos"
              }
            >
              {format(
                prayersToShow[index].time,
                timeFormat === "24h" ? "HH:mm" : "hh:mm"
              )}
            </ListGroup.Item>
            <ListGroup.Item
              className={
                item.name.toUpperCase() ===
                prayersData.current.name.toUpperCase()
                  ? "TimePos "
                  : "TimePos"
              }
              type="input"
              onClick={() => {
                if (item.name !== "Shurooq") {
                  if (navigator.onLine) {
                    setOffsetTime(data[index].Offset !== "" ? true : false);
                    prayerToChange.Name === item.name &&
                    props.user.userType === "Admin"
                      ? setPrayerToChange({ Name: "", Time: "", Offset: 0 })
                      : setPrayerToChange({
                          Name: item.name,
                          Time: data[index].Iqamah,
                          Offset: data[index].Offset,
                        });
                  } else {
                    //COnnect to internet to change iqamah time
                  }
                } else {
                  //cant change iqamah time for shurooq
                }
              }}
              active={
                prayerToChange.Name === item.name &&
                props.user.userType === "Admin" &&
                item.name !== "Shurooq"
                  ? true
                  : false
              }
            >
              {data != null
                ? data[index].Name !== "Shurooq"
                  ? data[index].Iqamah !== ""
                    ? format(
                        parseISO("2014-02-11T" + data[index].Iqamah + ":30"),
                        timeFormat === "24h" ? "HH:mm" : "hh:mm"
                      )
                    : format(
                        new Date(item.time).setMinutes(
                          item.time.getMinutes() + parseInt(data[index].Offset)
                        ),
                        timeFormat === "24h" ? "HH:mm" : "hh:mm"
                      )
                  : "N/A"
                : ""}
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
          style={{
            width: "100%",
            textAlign: "center",
            userSelect: "none",
            minWidth: "300px",
          }}
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
          <Form style={{ width: "150px", margin: "auto" }}>
            <Form.Check // prettier-ignore
              disabled={prayerToChange.Name === "Jummuah" ? true : false}
              type="switch"
              id="custom-switch"
              label="Offset Time"
              onChange={(e) => setOffsetTime(e.target.checked)}
              checked={offsetTime}
            />
          </Form>
          <input
            className="TimeInput"
            id="time"
            maxLength={offsetTime ? 3 : 5}
            placeholder={offsetTime ? "123" : "10:23"}
            value={offsetTime ? prayerToChange.Offset : prayerToChange.Time}
            onChange={setChangedTime}
          />
          <button
            className="TimeButton"
            onClick={() => {
              updatePrayerTime(
                prayerToChange.Name,
                prayerToChange.Time,
                prayerToChange.Offset
              ).then((r) => {
                if (r.message === true) {
                  setPrayerToChange({ Name: "", Time: "", Offset: "" });
                  setOffsetTime(false);
                } else {
                  console.log(r);
                }
              });
            }}
          >
            Set
          </button>
        </div>
        {/* <div style={{ display: prayerToChange.Name === "" ? "none" : "" }}>
          <input
            className="TimeInput"
            id="time"
            maxLength={5}
            placeholder="10:23"
            value={prayerToChange.Time}
            onChange={setChangedTime}
          />
          <button
            className="TimeButton"
            onClick={() => {
              updatePrayerTime(prayerToChange.Name, prayerToChange.Time).then(
                (r) => {
                  if (r.message === true) {
                    setPrayerToChange({ Name: "", Time: "" });
                  }
                }
              );
            }}
          >
            Set
          </button>
        </div> */}
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
    if (prayersData.isAfterIsha) {
      setPrayerToShow(prayersData.prayers.tomorrow);
    } else {
      setPrayerToShow(prayersData.prayers.today);
    }
  }
}

export default HorizontalList;
