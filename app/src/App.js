import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Donation from "./Pages/Donation";
import PrayerTimes from "./Pages/PrayerTimes";
import ContactUs from "./Pages/ContactUs";
import Login from "./Pages/Login";
import { isMobile } from "react-device-detect";
import Logo from "./Components/Logo/Logo";
import MobileNav from "./Components/NavBar/MobileNav";
import Settings from "./Pages/Settings";
import Popup from "./Components/Popup/Popup";

function App() {
  if (localStorage.getItem("user") === null) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        userType: "User",
        isSignedIn: false,
        token: null,
      })
    );
  }
  if (localStorage.getItem("defaultPage") === null) {
    localStorage.setItem("defaultPage", "/Home");
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const [loggedin, setLoggedIn] = React.useState(user.isSignedIn);
  const updateUserState = () => {
    setLoggedIn(!loggedin);
  };
  return (
    <>
      <div className="Header">
        <NavBar user={user} />
      </div>
      <div className="Body">
        <div className="Donation">
          <strong>Donation IBAN: IE28AIBK93744421240194 BIC: AIBKIE2D</strong>
        </div>

        <BrowserRouter>
          <Routes>
            <Route
              path="/Login"
              element={<Login updateLogin={updateUserState} />}
            />
            <Route
              path="/"
              element={
                isMobile ? (
                  <Navigate to={localStorage.getItem("defaultPage")} />
                ) : (
                  <Navigate to="/Home" />
                )
              }
            />
            <Route path="/Home" element={<Home user={user} />} />
            <Route path="/Donation" element={<Donation />} />
            <Route path="/PrayerTimes" element={<PrayerTimes user={user} />} />
            <Route path="/About" element={<About />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Settings" element={<Settings user={user} />} />
          </Routes>
        </BrowserRouter>
      </div>
      <div className="Footer">
        <MobileNav user={user} />
      </div>
    </>
  );
}

export default App;
