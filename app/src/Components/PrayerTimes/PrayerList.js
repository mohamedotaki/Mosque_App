import React from "react";
import "./List.css";
import ListGroup from "react-bootstrap/ListGroup";
import { format, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";

function PrayerList({
  prayersToShow,
  prayersData,
  data,
  timeFormat,
  onPrayerClick,
  userType,
}) {
  const { t } = useTranslation();

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
              <ListGroup.Item className={"ListPos"}>
                {t(item.name[0].toUpperCase() + item.name.slice(1))}
              </ListGroup.Item>
              <ListGroup.Item className={"TimePos"}>
                {format(
                  prayersToShow[index].time,
                  timeFormat === "24h" ? "HH:mm" : "hh:mm"
                )}
              </ListGroup.Item>
              <ListGroup.Item
                className={
                  item.name.toUpperCase() ===
                  prayersData.current.name.toUpperCase()
                    ? "TimePos "
                    : "TimePos"
                }
                type="input"
                onClick={() => onPrayerClick(item, index)}
              >
                {data != null
                  ? data[index].Name !== "Shurooq"
                    ? data[index].Iqamah !== ""
                      ? format(
                          parseISO("2014-02-11T" + data[index].Iqamah + ":30"),
                          timeFormat === "24h" ? "HH:mm" : "hh:mm"
                        )
                      : format(
                          new Date(item.time).setMinutes(
                            item.time.getMinutes() +
                              parseInt(data[index].Offset)
                          ),
                          timeFormat === "24h" ? "HH:mm" : "hh:mm"
                        )
                    : "N/A"
                  : ""}
              </ListGroup.Item>
            </ListGroup>
          )
      )}
    </>
  );
}

export default PrayerList;
