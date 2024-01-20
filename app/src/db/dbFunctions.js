function apiLink(link) {
  return "https://mosqueapp.api.alotaki.com/" + link;
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
async function signUp(title, contant) {
  if (!navigator.onLine) return "No Internet";

  try {
    const response = await fetch(apiLink("addposts"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, contant }),
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, contant }),
    });
    if (!response.ok) {
      throw new Error("Server Error");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
async function updatePost(id, title, contant) {
  try {
    const response = await fetch(apiLink("updatepost"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title, contant }),
    });
    if (!response.ok) {
      throw new Error("Server Error");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
async function deletePost(id) {
  try {
    const response = await fetch(apiLink("deletePost"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error("Server Error");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Time: time,
        Offset: offset,
      }),
    });
    if (!response.ok) {
      throw new Error("Server Error");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
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
    console.error("Error fetching data:", error);
  }
}

export {
  apiLink,
  updatePost,
  deletePost,
  addPost,
  login,
  getPrayerTimes,
  updatePrayerTime,
  getPosts,
  addfeedback,
  getFeedbacks,
};
