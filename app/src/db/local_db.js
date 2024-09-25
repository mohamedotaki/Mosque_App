function getUser_localDB() {
  return JSON.parse(localStorage.getItem("user"));
}

function setUser_localDB(
  name = "",
  email = "",
  userType = "User",
  isSignedin = false,
  token = null
) {
  localStorage.setItem(
    "user",
    JSON.stringify({
      name,
      email,
      userType,
      isSignedin,
      token,
    })
  );
}

function setIqamahTimes_localDb(data) {
  localStorage.setItem("IqamahTimes", JSON.stringify(data));
  var d = new Date();

  d.setDate(d.getDate() + ((4 + 7 - d.getDay()) % 7 || 7));
  d.setHours(13, 0, 0);
  localStorage.setItem("NextIqamahUpdate", d);
}
function setAdhanTimes_localDb(data) {
  localStorage.setItem("AdhanTimes", JSON.stringify(data));
}

function getIqamahTimes_localDB() {
  return JSON.parse(localStorage.getItem("IqamahTimes"));
}
function getAdhanTimes_localDB() {
  return JSON.parse(localStorage.getItem("AdhanTimes"));
}

function setTimeFormat_localDb(data) {
  localStorage.setItem("timeFormat", data);
}

function setLang(lang) {
  localStorage.setItem("Lang", lang);
}
function getLang() {
  return localStorage.getItem("Lang");
}

function getTimeFormat_localDb(data) {
  return localStorage.getItem("timeFormat");
}

function setAppVersion_localDb(data) {
  localStorage.setItem("appVersion", data);
}
function getAppVersion_localDb(data) {
  return localStorage.getItem("appVersion");
}

// new better storage
function setCustomPrayerTimes_localDb(data) {
  localStorage.setItem("PrayerTimes", JSON.stringify(data));
  var d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(13, 0, 0);
  localStorage.setItem("PrayerTimesNextUpdate", d);
}

function setNextUpdate_localDb() {
  var d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(13, 0, 0);
  localStorage.setItem("PrayerTimesNextUpdate", "");
}

function getCustomPrayerTimes_localDB() {
  return JSON.parse(localStorage.getItem("PrayerTimes"));
}

function getPrayerTimesNextUpdate_localDB() {
  return localStorage.getItem("PrayerTimesNextUpdate");
}
export {
  getUser_localDB,
  setUser_localDB,
  setIqamahTimes_localDb,
  setTimeFormat_localDb,
  getTimeFormat_localDb,
  getIqamahTimes_localDB,
  getPrayerTimesNextUpdate_localDB,
  setAppVersion_localDb,
  getAppVersion_localDb,
  getLang,
  setLang,
  setAdhanTimes_localDb,
  getAdhanTimes_localDB,
  setCustomPrayerTimes_localDb,
  getCustomPrayerTimes_localDB,
  setNextUpdate_localDb,
};
