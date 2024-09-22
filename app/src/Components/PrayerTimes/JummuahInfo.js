import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../translation/LanguageSwitcher";

function JummuahInfo({ data, prayerToChange, userType, onJummuahClick }) {
  const { t } = useTranslation();

  return (
    <ListGroup horizontal>
      <ListGroup.Item
        onClick={onJummuahClick}
        active={prayerToChange.Name === "Jummuah"}
        style={{
          width: "100%",
          textAlign: "center",
          userSelect: "none",
          minWidth: "300px",
        }}
      >
        <strong>
          {t("JummuahInfo")}
          {data != null ? data[6].Iqamah : ""}
        </strong>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default JummuahInfo;
