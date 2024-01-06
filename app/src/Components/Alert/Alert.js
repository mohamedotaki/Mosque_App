import "./Alert.css";
import { Check2, XOctagon } from "react-bootstrap-icons";

export default function ({ message, icon }) {
  return (
    <div className="AlertOuter">
      <div className="AlertInner">
        <h6 className="PopupIcon">
          {icon === "success" ? (
            <Check2
              className="Icon"
              color="Green"
              fontWeight={""}
              fontSize={"30"}
            />
          ) : (
            <XOctagon
              className="Icon"
              color="Red"
              fontWeight={""}
              fontSize={"30"}
            />
          )}
        </h6>
        <h6 className="AlertMessage">{message}</h6>
      </div>
    </div>
  );
}
