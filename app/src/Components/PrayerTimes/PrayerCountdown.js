import React from 'react';
import ListGroup from "react-bootstrap/ListGroup";

function PrayerCountdown({ nextPrayer, countdownDuration, percentage }) {
  return (
    <ListGroup horizontal key={"Title"}>
      <ListGroup.Item
        className="Title"
        style={{
          "--TimeLeft": percentage + "%",
        }}
      >
        {nextPrayer.name + " in " + convertSecondsToHMS(countdownDuration)}
      </ListGroup.Item>
    </ListGroup>
  );
}

function convertSecondsToHMS(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export default PrayerCountdown;