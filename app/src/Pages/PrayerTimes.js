import PrayerTimesContent from "../Components/PrayerTimes/PrayerTimesContent";
import React from "react";

export default function PrayerTimes(props) {
  return (
    <>
      <PrayerTimesContent user={props.user} />
    </>
  );
}
