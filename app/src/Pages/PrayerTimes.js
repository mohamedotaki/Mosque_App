import HorizontalList from "../Components/HorizontalList/HorizontalList";
import React from "react";

export default function PrayerTimes(props) {
  // setInterval(updateTime, 1000);

  return (
    <>
      <HorizontalList user={props.user} />
    </>
  );
}
