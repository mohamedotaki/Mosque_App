export const logout = () => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      userType: "User",
      isSignedIn: false,
      token: null,
    })
  );
  window.location.reload(false);
  return;
};

export const login = () => {
  console.log("4324324324");
};
