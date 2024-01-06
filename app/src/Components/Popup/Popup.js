import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Popup.css";

export default function Popup({ message, trigger, icon, setTrigger }) {
  let timeout;
  if (trigger) {
    timeout = setTimeout(() => closePopup(), 4000);
  }

  function closePopup() {
    setTrigger(false);
  }

  return trigger ? (
    <div
      className="NotifOuter"
      onClick={() => {
        setTrigger(false);
        clearInterval(timeout);
      }}
    >
      <div className="NotifInner">
        <div className="TopPart">
          <h6 className="PopupIcon">{icon}</h6>
          <h6 className="PopupMessage">{message}</h6>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
