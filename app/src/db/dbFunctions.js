function apiLink(link) {
  //production
  return "https://mosqueapp.api.alotaki.com/" + link;
  //localhost
}

//posts functions
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

export { apiLink, updatePost, deletePost, addPost };
