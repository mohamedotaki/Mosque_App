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

function setTimeFormat_localDb(data) {
  localStorage.setItem("timeFormat", data);
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
}

function getCustomPrayerTimes_localDB() {
  return JSON.parse(localStorage.getItem("PrayerTimes"));
}
function setLang_localDB(data) {
  localStorage.setItem("MosqueAppLang", data);
}

function getLang_localDB() {
  return localStorage.getItem("MosqueAppLang");
}

export {
  getUser_localDB,
  setUser_localDB,
  setTimeFormat_localDb,
  getTimeFormat_localDb,
  setAppVersion_localDb,
  getAppVersion_localDb,
  setCustomPrayerTimes_localDb,
  getCustomPrayerTimes_localDB,
  getLang_localDB,
  setLang_localDB,
};
