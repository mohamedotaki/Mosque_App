import {
  toDate,
  addDays,
  addHours,
  addMinutes,
  getYear,
  getMonth,
  getDate,
  startOfDay,
  endOfDay,
  isBefore,
  isAfter,
  isWithinInterval,
  differenceInSeconds,
} from 'date-fns';

const isDST = function (d) {
  const jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
  const jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
  return Math.max(jan, jul) !== d.getTimezoneOffset();
};

const dayCalc = (offsetDay = 0, offSetHour = 0, hijrioffset = 0, city = 'Europe/Dublin', nowDate = new Date()) => {
  const now = addHours(nowDate, offSetHour + offsetDay * 24);
  const month = getMonth(now);
  const date = getDate(now);

  const hijri = addDays(now, hijrioffset);
  const start = startOfDay(now);
  const end = endOfDay(now);

  const dstAdjust = isDST(now) ? 1 : 0;

  return { now, month, date, start, end, hijri, dstAdjust };
};

const prayerCalc = (
  hourMinute,
  hourMinuteNext,
  index,
  now,
  when,
  jamaahmethods,
  jamaahoffsets,
  dstAdjust
) => {
  const [hour, minute] = hourMinute;
  const [hourNext, minuteNext] = hourMinuteNext;

  let time = addHours(toDate(new Date(getYear(now), getMonth(now), getDate(now), hour, minute)), dstAdjust);

  /* *********************** */
  /* JAMAAH CALC             */
  /* *********************** */
  const hourOffset = jamaahoffsets[index][0];
  const minuteOffset = jamaahoffsets[index][1];
  const jamaahmethod = jamaahmethods[index];
  let jtime;

  switch (jamaahmethod) {
      case 'afterthis':
          jtime = addMinutes(time, hourOffset * 60 + minuteOffset);
          break;
      case 'fixed':
          jtime = toDate(new Date(getYear(now), getMonth(now), getDate(now), hourOffset, minuteOffset));
          break;
      case 'beforenext':
          const rawjtime = toDate(new Date(getYear(now), getMonth(now), getDate(now), hourNext, minuteNext));
          jtime = addMinutes(rawjtime, -hourOffset * 60 - minuteOffset + dstAdjust * 60);
          break;
      default:
          jtime = time;
  }

  // if jtime before adhan / ie. summer time
  if (isBefore(jtime, time)) {
      time = jtime;
  }

  /* *********************** */
  /* NAMES                   */
  /* *********************** */
  const names = ['Fajr', 'Shurooq', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const name = names[index];
  const hasPassed = isAfter(now, time);
  const isJamaahPending = isWithinInterval(now, { start: time, end: jtime });

  const isNext = false;

  const result = { time, isJamaahPending, jtime, index, hasPassed, name, when, dstAdjust, isNext };
  return result;
};

const prayersCalc = (
  timetable,
  settings,
  showJamaah = true,
  city = 'Europe/Dublin',
  nowDate = new Date()
) => {
  const { hijrioffset, jamaahmethods, jamaahoffsets } = settings;
  const { now, month, date, start, hijri, dstAdjust } = dayCalc(0, 0, hijrioffset, city, nowDate);
  const {
      now: nowYesterday,
      month: monthYesterday,
      date: dateYesterday,
      dstAdjust: dstAdjustYesterday,
  } = dayCalc(-1, 0, hijrioffset, city, nowDate);
  const {
      now: nowTomorrow,
      month: monthTomorrow,
      date: dateTomorrow,
      dstAdjust: dstAdjustTomorrow,
  } = dayCalc(1, 0, hijrioffset, city, nowDate);

  /* *********************** */
  /* SET PRAYERS             */
  /* *********************** */
  const prayersToday = timetable[month + 1][date].map((hourMinute, index) => {
      const hourMinuteNext = index < 5 ? timetable[month + 1][date][index + 1] : [24, 0];
      return prayerCalc(hourMinute, hourMinuteNext, index, now, 'today', jamaahmethods, jamaahoffsets, dstAdjust);
  });

  const prayersYesterday = timetable[monthYesterday + 1][dateYesterday].map(
      (hourMinute, index) => {
          const hourMinuteNext = index < 5 ? timetable[month + 1][date][index + 1] : [24, 0];
          return prayerCalc(
              hourMinute,
              hourMinuteNext,
              index,
              nowYesterday,
              'yesterday',
              jamaahmethods,
              jamaahoffsets,
              dstAdjustYesterday
          );
      }
  );

  const prayersTomorrow = timetable[monthTomorrow + 1][dateTomorrow].map((hourMinute, index) => {
      const hourMinuteNext = index < 5 ? timetable[month + 1][date][index + 1] : [24, 0];
      return prayerCalc(
          hourMinute,
          hourMinuteNext,
          index,
          nowTomorrow,
          'tomorrow',
          jamaahmethods,
          jamaahoffsets,
          dstAdjustTomorrow
      );
  });

  /* *********************** */
  /* PREVIOUS, CURRENT, NEXT */
  /* *********************** */
  let current;
  let next;
  let previous;

  if (isWithinInterval(now, { start, end: prayersToday[0].time })) {
      previous = prayersYesterday[4];
      current = prayersYesterday[5];
      next = prayersToday[0];
  } else if (isWithinInterval(now, { start: prayersToday[0].time, end: prayersToday[1].time })) {
      previous = prayersYesterday[5];
      current = prayersToday[0];
      next = prayersToday[1];
  } else if (isWithinInterval(now, { start: prayersToday[1].time, end: prayersToday[2].time })) {
      previous = prayersToday[0];
      current = prayersToday[1];
      next = prayersToday[2];
  } else if (isWithinInterval(now, { start: prayersToday[2].time, end: prayersToday[3].time })) {
      previous = prayersToday[1];
      current = prayersToday[2];
      next = prayersToday[3];
  } else if (isWithinInterval(now, { start: prayersToday[3].time, end: prayersToday[4].time })) {
      previous = prayersToday[2];
      current = prayersToday[3];
      next = prayersToday[4];
  } else if (isWithinInterval(now, { start: prayersToday[4].time, end: prayersToday[5].time })) {
      previous = prayersToday[3];
      current = prayersToday[4];
      next = prayersToday[5];
  } else {
      previous = prayersToday[4];
      current = prayersToday[5];
      next = prayersTomorrow[0];
  }

  /* *********************** */
  /* COUNTDOWN/UP            */
  /* *********************** */
  const countUp = {
      name:
          current.isJamaahPending || !showJamaah ? current.name : `${current.name}${current.index !== 1 ? ' jamaah' : ''}`,
      time: current.isJamaahPending || !showJamaah ? current.time : current.jtime,
      duration:
          current.isJamaahPending || !showJamaah
              ? differenceInSeconds(now, current.time)
              : differenceInSeconds(now, current.jtime),
  };

  const countDown = {
      name: current.isJamaahPending && showJamaah ? `${current.name}${current.index !== 1 ? ' jamaah' : ''}` : next.name,
      time: current.isJamaahPending && showJamaah ? current.jtime : next.time,
      duration:
          current.isJamaahPending && showJamaah
              ? differenceInSeconds(current.jtime, now) + 1
              : differenceInSeconds(next.time, now) + 1,
  };

  const totalDuration = countUp.duration + countDown.duration;

  const percentageRaw = 10000 - (countDown.duration / totalDuration) * 10000;
  const percentage = Math.floor(percentageRaw) / 100;

  const isAfterIsha = isAfter(now, prayersToday[5].jtime);
  const isJamaahPending = isWithinInterval(now, { start: current.time, end: current.jtime });
  const focus = current.isJamaahPending ? current : next;

  // focused prayer - add isNext
  if (isAfterIsha) {
      prayersTomorrow[focus.index].isNext = true;
  } else {
      prayersToday[focus.index].isNext = true;
  }

  // add day if after isha
  const trueNow = now;
  const trueHijri = hijri;
  const newNow = isAfterIsha ? addDays(now, 1) : now;
  const newHijri = isAfterIsha ? addDays(hijri, 1) : hijri;

  const result = {
      prayers: {
          today: prayersToday,
          yesterday: prayersYesterday,
          tomorrow: prayersTomorrow,
      },
      previous,
      current,
      next,
      countUp,
      countDown,
      now: newNow,
      hijri: newHijri,
      trueNow,
      trueHijri,
      percentage,
      isAfterIsha,
      isJamaahPending,
      focus,
  };
  return result;
};

export { prayersCalc, dayCalc };
