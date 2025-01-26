import React, { useState, useEffect, useCallback } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useTranslation } from "react-i18next";

function PrayerCountdown({ prayerData }) {
  const { t } = useTranslation();

  const [percentage, setPercentage] = useState(0);
  const [countdown, setCountdown] = useState(prayerData.countDown.duration);

  const UpdatePercentage = useCallback(() => {
    const totalDuration =
      prayerData.countUp.duration + prayerData.countDown.duration;
    const elapsedTime =
      prayerData.countUp.duration + (prayerData.countDown.duration - countdown);
    const newPercentage = (elapsedTime / totalDuration) * 100;
    setPercentage(Math.floor(newPercentage * 100) / 100);
  }, [prayerData, countdown]);

  const updateCountdown = useCallback(() => {
    UpdatePercentage();
    setCountdown((prevCountdown) => {
      if (prevCountdown <= 0) return 0;
      return prevCountdown - 1;
    });
  }, [UpdatePercentage]);

  useEffect(() => {
    prayerData && setCountdown(prayerData.countDown.duration);
  }, [prayerData]);

  useEffect(() => {
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [updateCountdown]);

  return (
    <ListGroup horizontal key={"Title"}>
      <ListGroup.Item
        className="Title"
        style={{
          "--TimeLeft": percentage + "%",
        }}
      >
        {t(prayerData.next.name) +
          " " +
          t("in") +
          " " +
          convertSecondsToHMS(countdown)}
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
