import React from "react";
import "./List.css";
import ListGroup from "react-bootstrap/ListGroup";
import { format, parseISO } from "date-fns";
import usePrayerTimes from "./usePrayerTimes";
import { useTranslation } from "react-i18next";

function PrayerList({
  prayersToShow = [],
  prayersData = {},
  timeFormat = "24h",
  onPrayerClick,
}) {
  const {t} = useTranslation();
  const formatTime = (time, currentFormat) => {
    try {
      return format(time, currentFormat === "24h" ? "HH:mm" : "hh:mm");
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Error";
    }
  };
  const { setData } = usePrayerTimes();
  /*   const getIqamahTime = (item, index) => {
    try {
      if (data[index]?.Name !== "Shurooq") {
        if (data[index]?.Iqamah) {
          return formatTime(
            parseISO(`2014-02-11T${data[index].Iqamah}:30`),
            timeFormat
          );
        } else if (data[index]?.Offset) {
          const offsetTime = new Date(item.time);
          offsetTime.setMinutes(
            offsetTime.getMinutes() + parseInt(data[index].Offset)
          );
          return formatTime(offsetTime, timeFormat);
        }
      }
      if (!data) {
        console.log("data is null");
        getPrayerTimes().then((data) => {
          if (data) {
            setData(data);
          }
        });
      }
      return "N/A";
    } catch (error) {
      console.error("Error calculating Iqamah time:", error);
      return "Error";
    }
  }; */
  return (
    <>
      <ListGroup horizontal>
        <ListGroup.Item className="ListPos">
          <strong>{t("Prayer")}</strong>
        </ListGroup.Item>
        <ListGroup.Item className="TimePos">
          <strong>{t("Adhan")}</strong>
        </ListGroup.Item>
        <ListGroup.Item className="TimePos">
          <strong>{t("Iqamah")}</strong>
        </ListGroup.Item>
      </ListGroup>
      {prayersToShow.map(
        (item, index) =>
          index < 6 && (
            <ListGroup horizontal key={item.name}>
              <ListGroup.Item className="ListPos">{item.name}</ListGroup.Item>
              <ListGroup.Item
                className="TimePos"
                onClick={() =>
                  onPrayerClick(
                    { ...item, time: formatTime(item.time, timeFormat) },
                    index,
                    true
                  )
                }
              >
                {formatTime(item.time, timeFormat)}
              </ListGroup.Item>
              <ListGroup.Item
                className={
                  item.name === prayersData.current?.name
                    ? "TimePos current-prayer"
                    : "TimePos"
                }
                type="input"
                onClick={() => onPrayerClick(item, index, false)}
              >
                {item.name === "Shurooq"
                  ? "N/A"
                  : formatTime(item.jtime, timeFormat)}
              </ListGroup.Item>
            </ListGroup>
          )
      )}
    </>
  );
}

export default PrayerList;
