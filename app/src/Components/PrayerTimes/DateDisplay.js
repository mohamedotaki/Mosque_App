import React from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import { format } from "date-fns";

function DateDisplay({ prayersToShow }) {
  return (
    <ListGroup horizontal key={"nhnh"}>
      <ListGroup.Item
        className="blockSelection centerxy"
        style={{ width: "100%" }}
      >
        {format(prayersToShow[2].time, "dd/MM/yyyy")}
      </ListGroup.Item>
    </ListGroup>
  );
}

export default DateDisplay;