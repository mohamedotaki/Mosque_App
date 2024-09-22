import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

function JummuahInfo({
  data = [],
  prayerToChange = {},
  userType,
  onJummuahClick,
}) {
  const getJummuahTime = () => {
    try {
      if (data && data[6] && data[6].Iqamah) {
        return data[6].Iqamah;
      }
      return "Not set";
    } catch (error) {
      console.error("Error getting Jummuah time:", error);
      return "Error";
    }
  };

  return (
    <ListGroup horizontal>
      <ListGroup.Item
        onClick={onJummuahClick}
        style={{
          width: "100%",
          textAlign: "center",
          userSelect: "none",
          minWidth: "300px",
        }}
      >
        <strong>Jummuah prayer is fixed at {getJummuahTime()}</strong>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default JummuahInfo;
