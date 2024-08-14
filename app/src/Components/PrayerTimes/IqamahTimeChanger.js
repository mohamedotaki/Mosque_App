import React from 'react';
import Form from "react-bootstrap/Form";
import { updatePrayerTime } from "../../db/dbFunctions";

function IqamahTimeChanger({ userType, prayerToChange, offsetTime, setOffsetTime, setChangedTime, setUpdate }) {
  if (userType !== "Admin") return null;

  return (
    <div className="TimeChange">
      <p className="TimeInputText">
        {prayerToChange.Name
          ? "Changing Time for " + prayerToChange.Name
          : "Click on iqamah time to change it"}
      </p>
      <div style={{ display: prayerToChange.Name === "" ? "none" : "" }}>
        <Form style={{ width: "150px", margin: "auto" }}>
          <Form.Check
            disabled={prayerToChange.Name === "Jummuah"}
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
              if (r) {
                setUpdate(prev => !prev);
              } else {
                alert(r);
              }
            });
          }}
        >
          Set
        </button>
      </div>
    </div>
  );
}

export default IqamahTimeChanger;