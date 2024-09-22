import React, { useState } from "react";
import { getTimeFormat_localDb } from "../../db/local_db";
import usePrayerTimes from "./usePrayerTimes";
import TimeFormatSelector from "./TimeFormatSelector";
import PrayerCountdown from "./PrayerCountdown";
import PrayerList from "./PrayerList";
import JummuahInfo from "./JummuahInfo";
import DateDisplay from "./DateDisplay";
import IqamahTimeChanger from "./IqamahTimeChanger";
import { addMonths } from "date-fns";
import TimeEditor from "./TimeEditor";

function PrayerTimesContent(props) {
  const {
    data,
    setData,
    prayersData,
    selectedDate,
    handleDateChange,
    handleCountdownRefresh,
    updateTime,
  } = usePrayerTimes();
  const [prayerToChange, setPrayerToChange] = useState(null);
  const [timeFormat, setTimeFormat] = useState(getTimeFormat_localDb());
  const handleTimeFormatChange = (format) => {
    setTimeFormat(format);
  };

  const handlePrayerClick = (item, index, adhan) => {
    if (props.user.userType !== "Admin") {
      return;
    }
    if (!item.name.includes("Shurooq")) {
      if (navigator.onLine) {
        setPrayerToChange({
          Name: item.name,
          Time: adhan ? item.time : data[index].Iqamah,
          Offset: data[index].Offset,
          adhan: adhan,
          OffsetTime: data[index].Offset !== "" && !adhan,
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
    setPrayerToChange({
      Name: "Jummuah",
      Time: data[6].Iqamah,
      adhan: false,
      OffsetTime: data[6].Offset !== "",
    });
  };
  return (
    <>
      <TimeFormatSelector onTimeFormatChange={handleTimeFormatChange} />
      <PrayerCountdown
        prayerData={prayersData}
        handleCountDownZero={handleCountdownRefresh}
      />
      <PrayerList
        prayersToShow={
          prayersData.isAfterIsha
            ? prayersData.prayers.tomorrow
            : prayersData.prayers.today
        }
        prayersData={prayersData}
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

      {prayerToChange && (
        <TimeEditor
          prayerToEdit={prayerToChange}
          setShowEditor={setPrayerToChange}
          userType={props.user.userType}
          update={updateTime}
        />
      )}

      {/*      <IqamahTimeChanger
        userType={props.user.userType}
        prayerToChange={prayerToChange}
        offsetTime={offsetTime}
        setOffsetTime={setOffsetTime}
        setUpdate={setData}
      /> */}
    </>
  );
}

export default PrayerTimesContent;
