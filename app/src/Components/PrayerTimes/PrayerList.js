import { useState, useEffect } from "react";
import "./List.css";
import ListGroup from "react-bootstrap/ListGroup";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

function PrayerList({ prayersData = {}, timeFormat = "24h", onPrayerClick }) {
  const [prayerToSHow, setPrayerToShow] = useState(prayersData.prayers.today);
  const { t } = useTranslation();
  const formatTime = (time, currentFormat) => {
    try {
      return format(time, currentFormat === "24h" ? "HH:mm" : "hh:mm");
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Error";
    }
  };

  useEffect(() => {
    setPrayerToShow(prayersData.prayers.today);
  }, [prayersData]);

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
      {prayerToSHow.map(
        (item, index) =>
          index < 6 && (
            <ListGroup horizontal key={item.name}>
              <ListGroup.Item className="ListPos">
                {t(item.name)}
              </ListGroup.Item>
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
