import { useState, useEffect, useCallback } from "react";
import { prayersCalc } from "../../Fun/Prayers";
import TimeTable from "../../Others/TimeTable.json";
import Settings from "../../Others/Settings.json";
import { getPrayerTimes } from "../../db/dbFunctions";
import {
  getCustomPrayerTimes_localDB,
  setCustomPrayerTimes_localDb,
} from "../../db/local_db";

function usePrayerTimes() {
  const [data, setData] = useState(getCustomPrayerTimes_localDB());
  const [prayersData, setPrayersData] = useState(
    prayersCalc(TimeTable, Settings, false, undefined, new Date(), data)
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dataUpdated, setDataUpdated] = useState(false);

  useEffect(() => {
    getPrayerDataFromDB();
    updateTime();
  }, []);

  /*   // getting online prayer data once a day after 1pm
  useEffect(() => {
    const updateDate = new Date(getPrayerTimesNextUpdate_localDB() || 0);
    if (updateDate.getTime() <= new Date().getTime()) {
      getPrayerDataFromDB();
      setDataUpdated(true);
    } else {
      getPrayerDataFromDB(); // to delete
      // if a user left the app open it will trigger update every day at 1
      const intervals = updateDate.getTime() - new Date().getTime();
      console.log(intervals);
      const timer = setInterval(getPrayerDataFromDB, intervals);
      return () => clearInterval(timer);
    }
  }, [dataUpdated]); */

  // To get online data from Database
  const getPrayerDataFromDB = () => {
    getPrayerTimes().then((result) => {
      if (result) {
        setCustomPrayerTimes_localDb(result);
        setData(result);
      }
    });
  };

  const updateTime = useCallback(() => {
    const isAfterIsha = prayersData.countDown.name === "Isha";
    let nowDate = new Date();
    if (isAfterIsha) {
      nowDate.setDate(nowDate.getDate() + 1);
    }
    getPrayerDataFromDB();
    setPrayersData(
      prayersCalc(TimeTable, Settings, false, undefined, nowDate, data)
    );
  }, [data]);

  useEffect(() => {
    const intervals = prayersData.countDown.duration * 1000;
    const timer = setInterval(updateTime, intervals);
    return () => clearInterval(timer);
  }, [updateTime, prayersData.countDown.duration]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPrayersData(prayersCalc(TimeTable, Settings, false, undefined, date));
  };

  const handleCountdownRefresh = () => {
    if (
      selectedDate.getDay() === new Date().getDay() &&
      selectedDate.getMonth() === new Date().getMonth()
    ) {
      handleDateChange(new Date());
    } else {
      handleDateChange(selectedDate);
    }
  };

  return {
    data,
    setData,
    prayersData,
    setPrayersData,
    selectedDate,
    handleDateChange,
    handleCountdownRefresh,
    updateTime,
  };
}

export default usePrayerTimes;
