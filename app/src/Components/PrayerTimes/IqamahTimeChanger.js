import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { updatePrayerTime, updateAdhanTime } from "../../db/dbFunctions";

function IqamahTimeChanger({
  userType,
  prayerToChange,
  offsetTime,
  setOffsetTime,
  setUpdate,
}) {
  const [prayerNewData, setPrayerNewData] = useState(prayerToChange);
  if (userType !== "Admin") return null;

  const handleClick = () => {
    if (prayerNewData.adhan) {
      updateAdhanTime(prayerNewData.Name, prayerNewData.Time).then((r) => {
        if (r) {
          setUpdate((prev) => !prev);
        } else {
          alert(r);
        }
      });
      console.log("adhan");
    } else {
      console.log("Iqamh");

      updatePrayerTime(
        prayerNewData.Name,
        prayerNewData.Time,
        prayerNewData.Offset
      ).then((r) => {
        if (r) {
          setUpdate((prev) => !prev);
        } else {
          alert(r);
        }
      });
    }
  };

  const handleChange = (e) => {
    if (offsetTime && !prayerToChange.Name.includes("Jummuah")) {
      setPrayerNewData({
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
        setPrayerNewData({
          Name: prayerToChange.Name,
          Time: e.target.value + ":",
          Offset: "",
        });
      } else {
        setPrayerNewData({
          Name: prayerToChange.Name,
          Time: e.target.value,
          Offset: "",
        });
      }
    }
  };

  return (
    <div className="TimeChange">
      <p className="TimeInputText">
        {prayerToChange.Name
          ? prayerToChange.adhan
            ? "Changing adhan Time for " + prayerToChange.Name
            : "Changing iqamah Time for " + prayerToChange.Name
          : "Click on iqamah time to change it"}
      </p>
      <div style={{ display: prayerToChange.Name === "" ? "none" : "" }}>
        <Form style={{ width: "150px", margin: "auto" }}>
          <Form.Check
            disabled={prayerToChange.Name === "Jummuah" || prayerToChange.adhan}
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
          value={offsetTime ? prayerToChange.Offset : prayerNewData.Time}
          onChange={handleChange}
        />
        <button className="TimeButton" onClick={handleClick}>
          Set
        </button>
      </div>
    </div>
  );
}

export default IqamahTimeChanger;
