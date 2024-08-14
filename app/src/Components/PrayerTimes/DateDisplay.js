import React, { useState } from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateDisplay({ dateOfPrayers, onDateChange }) {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {
    onDateChange(date);
    setShowCalendar(false);
    dateOfPrayers = date;
  };

  return (
    <ListGroup horizontal key={"nhnh"}>
      <ListGroup.Item
        className="blockSelection centerxy"
        style={{ width: "100%", cursor: "pointer" }}
        onClick={handleDateClick}
      >
        {format(dateOfPrayers, "dd/MM/yyyy")}
      </ListGroup.Item>
      {showCalendar && (
        <DatePicker
          selected={dateOfPrayers}
          onChange={handleDateChange}
          inline
        />
      )}
    </ListGroup>
  );
}

export default DateDisplay;