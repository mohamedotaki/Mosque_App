import React, { useState, useEffect } from "react";
import {
  getTimeFormat_localDb,
} from "../../db/local_db";
import usePrayerTimes from "./usePrayerTimes";
import TimeFormatSelector from "./TimeFormatSelector";
import PrayerCountdown from "./PrayerCountdown";
import PrayerList from "./PrayerList";
import JummuahInfo from "./JummuahInfo";
import DateDisplay from "./DateDisplay";
import IqamahTimeChanger from "./IqamahTimeChanger";

function PrayerTimesContent(props) {
  const {
    data,
    setData,
    prayersData,
    setPrayersData,
    selectedDate,
    handleDateChange,
    handleCountdownZero,
  } = usePrayerTimes();
  //const [update, setUpdate] = useState(false);
  const [offsetTime, setOffsetTime] = useState(false);
  const [prayerToChange, setPrayerToChange] = useState({
    Name: "",
    Time: "",
    Offset: "",
  });
  const [timeFormat, setTimeFormat] = useState(getTimeFormat_localDb());

  const handleTimeFormatChange = (format) => {
    setTimeFormat(format);
  };

  const handlePrayerClick = (item, index) => {
    if (props.user.userType !== "Admin") {
      return;
    }
    if (!item.name.includes("shurooq")) {
      if (navigator.onLine) {
        setOffsetTime(data[index].Offset !== "" ? true : false);
        prayerToChange.Name === item.name
          ? setPrayerToChange({ Name: "", Time: "", Offset: 0 })
          : setPrayerToChange({
              Name: item.name,
              Time: data[index].Iqamah,
              Offset: data[index].Offset,
            });
      } else {
        alert(
          "You are offline. Please connect to the internet to change Iqamah times."
        );
      }
    } else {
      alert("You can't change Shurooq time.");
    }
  };

  const handleJummuahClick = () => {
    if (!props.user.userType.includes("Admin")) {
      return;
    }
    if (
      prayerToChange.Name.includes("Jummuah") &&
      props.user.userType === "Admin"
    ) {
      setPrayerToChange({ Name: "", Time: "" });
    } else {
      setPrayerToChange({ Name: "Jummuah", Time: data[6].Iqamah });
      setOffsetTime(data[6].Offset !== "" ? true : false);
    }
  };

  const setChangedTime = (e) => {
    if (offsetTime && !prayerToChange.Name.includes("Jummuah")) {
      setPrayerToChange({
        Name: prayerToChange.Name,
        Time: "",
        Offset: e.target.value,
      });
    } else {
      if (
        e.target.value.length === 2 &&
        e.nativeEvent.inputType !== "deleteContentBackward" &&
        !offsetTime
      ) {
        setPrayerToChange({
          Name: prayerToChange.Name,
          Time: e.target.value + ":",
          Offset: "",
        });
      } else {
        setPrayerToChange({
          Name: prayerToChange.Name,
          Time: e.target.value,
          Offset: "",
        });
      }
    }
  };

  return (
    <>
      <TimeFormatSelector onTimeFormatChange={handleTimeFormatChange} />
      <PrayerCountdown prayerData={prayersData} handleCountDownZero={handleCountdownZero} />
      <PrayerList
        prayersToShow={
          prayersData.isAfterIsha
            ? prayersData.prayers.tomorrow
            : prayersData.prayers.today
        }
        prayersData={prayersData}
        data={data}
        timeFormat={timeFormat}
        onPrayerClick={handlePrayerClick}
        userType={props.user.userType}
      />
      <JummuahInfo
        data={data}
        prayerToChange={prayerToChange}
        userType={props.user.userType}
        onJummuahClick={handleJummuahClick}
      />
      <DateDisplay
        dateOfPrayers={selectedDate}
        onDateChange={handleDateChange}
      />

      <IqamahTimeChanger
        userType={props.user.userType}
        prayerToChange={prayerToChange}
        offsetTime={offsetTime}
        setOffsetTime={setOffsetTime}
        setChangedTime={setChangedTime}
        setUpdate={setData}
      />
    </>
  );
}

export default PrayerTimesContent;
