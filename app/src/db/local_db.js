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
function getNextIqamahUpdate_localDB() {
  return localStorage.getItem("NextIqamahUpdate");
}

function getIqamahTimes_localDB() {
  return JSON.parse(localStorage.getItem("IqamahTimes"));
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

export {
  getUser_localDB,
  setUser_localDB,
  setIqamahTimes_localDb,
  setTimeFormat_localDb,
  getTimeFormat_localDb,
  getIqamahTimes_localDB,
  getNextIqamahUpdate_localDB,
  setAppVersion_localDb,
  getAppVersion_localDb,
};
