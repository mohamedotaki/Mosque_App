import React from 'react';
import ListGroup from "react-bootstrap/ListGroup";

function JummuahInfo({ data, prayerToChange, userType, onJummuahClick }) {
  return (
    <ListGroup horizontal>
      <ListGroup.Item
        onClick={onJummuahClick}
        active={
          prayerToChange.Name === "Jummuah"
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
  );
}

export default JummuahInfo;