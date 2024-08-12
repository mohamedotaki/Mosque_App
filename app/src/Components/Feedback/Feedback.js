import "./Feedback.css";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { addfeedback } from "../../db/dbFunctions";

export default function Feedback(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const sendFeedback = (event) => {
    if (name === "" || email === "" || feedback === "") {
      event.preventDefault();
      alert("Please fill all required fields");
    } else {
      addfeedback(name, email, feedback).then((r) => {
        if (!r.message) {
          event.preventDefault();
          alert("Please try again");
        } else {
          alert("Thank you!");
        }
      });
    }
  };

  return (
    <div className="feedbackMain">
      <Form onSubmit={sendFeedback}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="Name"
            value={name}
            placeholder="example: Ahmad"
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="name@example.com"
            value={email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Feedback</Form.Label>
          <Form.Control
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{
            backgroundColor: "green",
            borderColor: "green",
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
