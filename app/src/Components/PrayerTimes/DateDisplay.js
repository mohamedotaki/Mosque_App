import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateDisplay({ dateOfPrayers, onDateChange }) {
  const [showCalendar, setShowCalendar] = useState(false);
  console.log("showCalendar");
  const handleDateClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {
    onDateChange(date);
    setShowCalendar(false);
    dateOfPrayers = date;
  };
  const preventBubbling = (event) => {
    event.stopPropagation();
  };
  return (
    <ListGroup key={"nhnh"}>
      <ListGroup.Item
        className="blockSelection centerxy"
        style={{ width: "100%", cursor: "pointer" }}
        onClick={handleDateClick}
      >
        {format(dateOfPrayers, "dd/MMMM/yyyy")}
      </ListGroup.Item>
      <ListGroup.Item
        className="blockSelection centerxy"
        style={{ width: "100%" }}
      >
        {new Intl.DateTimeFormat("ar-TN-u-ca-islamic", {
          day: "numeric",
          month: "long",
          weekday: "long",
          year: "numeric",
        }).format(new Date(dateOfPrayers))}
      </ListGroup.Item>
      {showCalendar && (
        <div className="fixed-bg" onClick={() => setShowCalendar(false)}>
          <div className="fixed-inner" onClick={preventBubbling}>
            <DatePicker
              selected={dateOfPrayers}
              onChange={handleDateChange}
              inline
            />
          </div>
        </div>
      )}
    </ListGroup>
  );
}

export default DateDisplay;
