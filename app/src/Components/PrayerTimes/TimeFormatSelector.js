import React, { useState, useCallback } from 'react';
import { getTimeFormat_localDb, setTimeFormat_localDb } from "../../db/local_db";

function TimeFormatSelector({ onTimeFormatChange }) {
  const [timeFormat, setTimeFormat] = useState(getTimeFormat_localDb() || "12h");

  const handleTimeFormatChange = useCallback((format) => {
    setTimeFormat_localDb(format);
    setTimeFormat(format);
    onTimeFormatChange(format);
  }, [onTimeFormatChange]);

  return (
    <div className="TimeFormat">
      <button
        className={timeFormat === "24h" ? "selected TimeFormat24" : "TimeFormat24"}
        onClick={() => handleTimeFormatChange("24h")}
      >
        24h
      </button>
      <button
        className={timeFormat === "12h" ? "selected TimeFormat12" : "TimeFormat12"}
        onClick={() => handleTimeFormatChange("12h")}
      >
        12h
      </button>
    </div>
  );
}

export default TimeFormatSelector;