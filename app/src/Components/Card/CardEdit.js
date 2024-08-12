import "./Card.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { updatePost, addPost } from "../../db/dbFunctions";
import Popup from "../Popup/Popup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CardEdit({
  update,
  data,
  trigger,
  setTrigger,
  updateView,
}) {
  const [title, setTitle] = useState(data ? data.title : "");
  const [contant, setContant] = useState(data ? data.contant : "");
  const [showPopup, setPopup] = useState(false);

  function updateUser() {
    updateView();
    if (update) {
      setTrigger(false);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (update) {
      updatePost(data.id, title, contant).then((result) => {
        if (result === true) {
          updateUser();
        } else {
          alert(result);
        }
      });
    } else {
      addPost(title, contant).then((result) => {
        if (result === true) {
          updateUser();
        } else {
          alert(result);
        }
      });
    }
  };

  return trigger ? (
    <>
      <Popup
        message={"Post was updated"}
        trigger={showPopup}
        setTrigger={handleSubmit}
      />
      <Form className="tests" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Post Heading</Form.Label>
          <Form.Control
            type="text"
            placeholder="Post Heading"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Main Text</Form.Label>
          <ReactQuill theme="snow" value={contant} onChange={setContant} />
        </Form.Group>
        <Button className="AdminBT" variant="primary" type="submit">
          {update ? "Update Post" : "Add Post"}
        </Button>
      </Form>
    </>
  ) : (
    ""
  );
}
