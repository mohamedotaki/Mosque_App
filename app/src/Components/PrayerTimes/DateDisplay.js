import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ExclamationTriangleFill } from "react-bootstrap-icons";

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
  const preventBubbling = (event) => {
    event.stopPropagation();
  };
  return (
    // warning showing prayers for date 'dateOfPrayers'
    <ListGroup key={"nhnh"}>
      <ListGroup.Item
        className="blockSelection centerxy"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: "100%",
          cursor: "pointer",
          fontWeight: 600,
          color: dateOfPrayers.getDate() !== new Date().getDate() && "Orange",
        }}
        onClick={handleDateClick}
      >
        {format(dateOfPrayers, "dd/MMMM/yyyy")}
        {dateOfPrayers.getDate() !== new Date().getDate() && (
          <ExclamationTriangleFill color="Orange" />
        )}
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
