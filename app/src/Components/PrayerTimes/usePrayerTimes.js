import { useState, useEffect, useCallback } from 'react';
import { prayersCalc } from "../../Fun/Prayers";
import TimeTable from "../../Others/TimeTable.json";
import Settings from "../../Others/Settings.json";
import { getPrayerTimes } from "../../db/dbFunctions";
import { getIqamahTimes_localDB, setIqamahTimes_localDb } from "../../db/local_db";

function usePrayerTimes() {
  const [data, setData] = useState(getIqamahTimes_localDB());
  const [prayersData, setPrayersData] = useState(prayersCalc(TimeTable, Settings, false, undefined, new Date()));
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    getPrayerTimes().then((result) => {
      if (result !== null) {
        setData(result);
        setIqamahTimes_localDb(result);
      }
    });
  }, []);

  const updateTime = useCallback(() => {
    setPrayersData(prayersCalc(TimeTable, Settings, false, undefined, selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    const intervals = prayersData.countDown.duration * 1000;
    const timer = setInterval(updateTime, intervals);
    return () => clearInterval(timer);
  }, [updateTime, prayersData.countDown.duration]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPrayersData(prayersCalc(TimeTable, Settings, false, undefined, date));
  };

  return { data, setData, prayersData, setPrayersData, selectedDate, handleDateChange };
}

export default usePrayerTimes;