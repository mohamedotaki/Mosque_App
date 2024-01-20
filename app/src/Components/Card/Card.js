import Admin from "../Admin/Admin";
import "./Card.css";
import CardEdit from "./CardEdit";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Confirm from "../Confirm/Confirm";
import { deletePost } from "../../db/dbFunctions";
import DOMPurify from "dompurify";

export default function Card(props) {
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setConfirm] = useState({
    show: false,
    message: "",
    fun: null,
  });

  return (
    <>
      <div className="CardMain">
        {props.Data.image ? (
          <img className="CardImage" src={props.Data.image} />
        ) : (
          ""
        )}
        <h2 className="CardTitle">{props.Data.title}</h2>
        <hr className="Line"></hr>
        <div
          className="CardText"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(props.Data.contant),
          }}
        >
          {}
        </div>
        <p className="PostDate">{props.Data.postDate.substring(0, 10)}</p>
        <div
          className="AdminButtons"
          style={{ display: props.user.userType === "Admin" ? "" : "none" }}
        >
          <button className="AdminBT" onClick={() => setShowForm(!showForm)}>
            <PencilSquare color="blue" />
          </button>
          <br />
          <button
            className="AdminBT"
            onClick={() => {
              setConfirm({
                show: true,
                message: "Are you sure you want to delete this post?",
                fun: () =>
                  deletePost(props.Data.id).then((result) =>
                    result.message ? props.getPosts() : ""
                  ),
              });
            }}
          >
            <Trash color="red" />
          </button>
        </div>
        <div style={{ display: props.user.userType === "Admin" ? "" : "none" }}>
          <CardEdit
            update={true}
            data={props.Data}
            trigger={showForm}
            setTrigger={setShowForm}
            updateView={props.getPosts}
          />
        </div>
      </div>
      <Confirm
        message={showConfirm.message}
        trigger={showConfirm.show}
        acceptBtName={"Delete"}
        setTrigger={setConfirm}
        results={(data) => (data ? showConfirm.fun() : "")}
      />
    </>
  );
}
