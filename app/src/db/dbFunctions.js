import { getUser_localDB } from "./local_db";
import Alert from "react-bootstrap/Alert";

const user = getUser_localDB();

function apiLink(link) {
  var api = "https://mosqueapp.api.alotaki.com/";
  //var api = "http://localhost:3001/";
  return api + link;
}
//Login
async function login(email, password) {
  if (!navigator.onLine) return "No Internet";
  try {
    const response = await fetch(apiLink("login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Server Error");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
async function signUp(email, password) {
  if (!navigator.onLine) return "No Internet";

  try {
    const response = await fetch(apiLink("signup"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Server Error");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

//posts functions
async function getPosts() {
  if (!navigator.onLine) return "No Internet";

  try {
    const response = await fetch(apiLink("getposts"));
    if (!response.ok) {
      throw new Error("Server Error");
    }
    return await response.json();
  } catch (error) {
    return null;
    console.error("Error fetching data:", error);
  }
}
async function addPost(title, contant) {
  try {
    const response = await fetch(apiLink("addposts"), {
      method: "POST",
      headers: {
        "user-Token": user.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, contant }),
    });
    return checkResponseStatus(response.status);
  } catch (error) {
    return checkResponseStatus(503);
  }
}

async function updatePost(id, title, contant) {
  try {
    const response = await fetch(apiLink("updatepost"), {
      method: "POST",
      headers: {
        "user-Token": user.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title, contant }),
    });
    return checkResponseStatus(response.status);
  } catch (error) {
    return checkResponseStatus(503);
  }
}
async function deletePost(id) {
  try {
    const response = await fetch(apiLink("deletePost"), {
      method: "POST",
      headers: {
        "user-Token": user.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    return checkResponseStatus(response.status);
  } catch (error) {
    return checkResponseStatus(503);
  }
}

async function getPrayerTimes() {
  try {
    const response = await fetch(apiLink("prayerTimes"));

    if (!response.ok) {
      throw new Error("Server Error");
    }
    return await response.json();
  } catch (error) {
    return null;
  }
}

async function updatePrayerTime(name, time, offset) {
  try {
    const response = await fetch(apiLink("updatePrayerTime"), {
      method: "POST",
      headers: {
        "user-Token": user.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Time: time,
        Offset: offset,
      }),
    });
    return checkResponseStatus(response.status);
  } catch (error) {
    return checkResponseStatus(503);
  }
}

async function updateAdhanTime(name, time, offset) {
  try {
    const response = await fetch(apiLink("updateAdhanTime"), {
      method: "POST",
      headers: {
        "user-Token": user.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Time: time,
        Offset: offset,
      }),
    });
    return checkResponseStatus(response.status);
  } catch (error) {
    return checkResponseStatus(503);
  }
}

async function addfeedback(name, email, feedback) {
  try {
    const response = await fetch(apiLink("addfeedback"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, feedback }),
    });
    if (!response.ok) {
      throw new Error("Server Error");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getFeedbacks() {
  try {
    const response = await fetch(apiLink("getfeedback"));

    if (!response.ok) {
      throw new Error("Server Error");
    }
    return await response.json();
  } catch (error) {
    return undefined;
  }
}

async function getAppVersion() {
  try {
    const response = await fetch(apiLink("appVersion"));
    if (!response.ok) {
      throw new Error("Server Error");
    }
    return await response.json();
  } catch (error) {
    return undefined;
  }
}

function checkResponseStatus(responseStatus) {
  switch (responseStatus) {
    case 511:
      return "Please Login";
      break;
    case 503:
      return "Server is down. Please try again later";
      break;
    case 400:
      return "Please try again later";
      break;
    case 200:
      return true;
      break;
  }
}

export {
  apiLink,
  updatePost,
  deletePost,
  addPost,
  login,
  signUp,
  getPrayerTimes,
  updatePrayerTime,
  getPosts,
  addfeedback,
  getFeedbacks,
  getAppVersion,
  updateAdhanTime,
};
