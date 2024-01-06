import "./Card.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { updatePost, apiLink } from "../../db/dbFunctions";
import Popup from "../Popup/Popup";

export default function CardEdit(props) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(props.data ? props.data.title : "");
  const [contant, setContant] = useState(props.data ? props.data.contant : "");
  const [showPopup, setPopup] = useState(false);

  //const [showForm, setShowForm] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    updatePost(props.data.id, title, contant).then((movies) => {});
  };

  const newPost = (event) => {
    event.preventDefault();

    let imageLink = "";
    /*  if (image != null) {
      fetch(apiLink("uploadImage"), { method: "POST", body: image })
        .then((r) => r.json())
        .then((r) => {
          imageLink = r.FileLink;

          fetch(apiLink("addposts"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, contant, imageLink }),
          })
            .then((r) => r.json())
            .then((r) => {
              console.log(r);
              if (true === r.message) {
              } else {
                event.preventDefault();
              }
            });
        });
    } else { */
    fetch(apiLink("addposts"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, contant, imageLink }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (true === r.message) {
          setContant("");
          setTitle("");
          props.resetState(false);
          //setPopup(true);
          console.log("worked");
        } else {
          event.preventDefault();
          console.log("no");
        }
      });
  };
  // };

  return props.trigger ? (
    <>
      <Popup
        message={"Post was updated"}
        trigger={showPopup}
        setTrigger={setPopup}
      />
      <Form className="tests" onSubmit={handleSubmit}>
        {/*  <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload an Image</Form.Label>
          {image ? <img className="ImagePreview" src={image} /> : ""}

          <Form.Control
          disabled
            type="file"
            onChange={(e) => {
              console.log("in form");
              const formData = new FormData();
              formData.append(
                "my-image-file",
                e.target.files[0],
                e.target.files[0].name
              );
              setImage(formData);
              console.log("Image was set");
            }}
          />
        </Form.Group> */}
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
          <Form.Control
            as="textarea"
            rows={5}
            value={contant}
            onChange={(e) => setContant(e.target.value)}
          />
        </Form.Group>
        <Button
          className="AdminBT"
          variant="primary"
          type="submit"
          // onClick={props.update ? run : newPost}
        >
          {props.update ? "Update Post" : "Add Post"}
        </Button>
      </Form>
    </>
  ) : (
    ""
  );
}
