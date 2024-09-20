import { useState } from "react";
import { updatePrayerTime, updateAdhanTime } from "../../db/dbFunctions";

const TimeEditor = ({ prayerToEdit, setShowEditor, userType }) => {
  const [prayerData, setPrayerData] = useState(prayerToEdit);

  const handleSubmit = (e) => {
    if (prayerData.adhan) {
      updateAdhanTime(prayerData.Name, prayerData.Time).then((r) => {
        if (r) {
          /*           setUpdate((prev) => !prev);
           */
          setShowEditor(false);
        } else {
          alert(r);
        }
      });
    } else {
      updatePrayerTime(
        prayerData.Name,
        prayerData.OffsetTime ? "" : prayerData.Time,
        prayerData.OffsetTime ? prayerData.Offset : ""
      ).then((r) => {
        if (r) {
          /*           setUpdate((prev) => !prev);
           */
          setShowEditor(false);
        } else {
          alert(r);
        }
      });
    }
  };

  return (
    userType === "Admin" && (
      <div className="fixed-bg">
        <div className="fixed-inner">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h5>
              {"Editing " + prayerData.Name}
              {prayerData.adhan ? " Adhan" : " Iqamah"}
            </h5>
            {prayerData.OffsetTime && <p>{prayerData.Offset}</p>}{" "}
            <input
              style={{ borderRadius: "20px", textAlign: "center" }}
              type={prayerData.OffsetTime ? "range" : "time"}
              min={0}
              max={60}
              value={
                prayerData.OffsetTime ? prayerData.Offset : prayerData.Time
              }
              onChange={(e) =>
                setPrayerData({
                  ...prayerData,
                  [prayerData.OffsetTime ? "Offset" : "Time"]: e.target.value,
                })
              }
            />
            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "10px",
                alignItems: "center",
              }}
            >
              <p style={{ margin: 0, fontWeight: 600 }}>Offset Time</p>
              <input
                disabled={prayerData.adhan || prayerData.Name === "Jummuah"}
                type="checkbox"
                checked={prayerData.OffsetTime}
                onChange={() =>
                  setPrayerData({
                    ...prayerData,
                    OffsetTime: !prayerData.OffsetTime,
                  })
                }
              />
            </div>
            <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
              <Button btName="Cancel" onclick={() => setShowEditor(null)} />
              <Button
                btName="Update Time"
                color={"green"}
                onclick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

const Button = ({ btName = "", color, onclick }) => {
  return (
    <button
      style={{
        minWidth: "100px",
        borderRadius: "20px",
        border: 0,
        padding: "10px",
        backgroundColor: color,
        fontWeight: 500,
      }}
      onClick={onclick}
    >
      {btName}
    </button>
  );
};

export default TimeEditor;
