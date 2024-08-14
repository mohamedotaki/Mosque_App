import React, { useState, useEffect } from 'react';
import ListGroup from "react-bootstrap/ListGroup";

function PrayerCountdown({ prayerData }) {
  const [countdown, setCountdown] = useState(prayerData.countDown.duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ListGroup horizontal key={"Title"}>
      <ListGroup.Item
        className="Title"
        style={{
          "--TimeLeft": prayerData.percentage + "%",
        }}
      >
        {prayerData.next.name + " in " + convertSecondsToHMS(countdown)}
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