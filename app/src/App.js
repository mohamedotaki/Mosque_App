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
import Qibla from "./Pages/Qibla";
import { isMobile } from "react-device-detect";
import MobileNav from "./Components/NavBar/MobileNav";
import Settings from "./Pages/Settings";
import FeedbackReview from "./Pages/FeedbackReview";
import InstallButton from "./Components/InstallButton";
import UpdateApp from "./Fun/UpdateApp";
import { getUser_localDB, setUser_localDB } from "./db/local_db";
import Feedback from "./Components/Feedback/Feedback";

function App() {
  if (getUser_localDB() === null) {
    setUser_localDB();
  }

  const user = getUser_localDB();
  const [loggedin, setLoggedIn] = React.useState(user.isSignedIn);

  const updateUserState = () => {
    setLoggedIn(!loggedin);
  };

  UpdateApp(); // forces update

  return (
    <>
      <div className="Header">
        <NavBar user={user} />
        <div className="Donation">
          <strong>Donation IBAN: IE28AIBK93744421240194 BIC: AIBKIE2D</strong>

          <InstallButton></InstallButton>
        </div>
      </div>

      <div className="Body">
        <Routes>
          <Route
            path="/Login"
            element={<Login updateLogin={updateUserState} />}
          />
          <Route
            path="/"
            element={
              isMobile ? (
                <Navigate to="/PrayerTimes" />
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
          <Route path="/Qibla" element={<Qibla />} />
          <Route path="/Feedback" element={<Feedback />} />

          <Route path="/FeedbackReview" element={<FeedbackReview />} />
          <Route path="/Settings" element={<Settings user={user} />} />
        </Routes>
      </div>
      <div className="Footer">
        <MobileNav user={user} />
      </div>
    </>
  );
}

export default App;
