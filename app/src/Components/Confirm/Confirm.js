import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Confirm.css";
import { ExclamationTriangle } from "react-bootstrap-icons";

export default function Confirm({
  message,
  trigger,
  acceptBtName,
  setTrigger,
  results,
}) {
  function btClick(data) {
    results(data);
    setTrigger({ show: false });
  }
  return trigger ? (
    <div className={"OuterPopup"}>
      <div className={"InnerPopup"}>
        <div className="TopPart">
          <ExclamationTriangle className="PopupIcon" />
          <h6 className="PopupMessage">{message}</h6>
        </div>
        <div className="Buttons">
          <button
            className="btn btn-warning PopupButton"
            onClick={() => btClick(true)}
          >
            {acceptBtName ? acceptBtName : "Yes"}
          </button>
          <button
            className="btn btn-secondary PopupButton"
            onClick={() => btClick(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
