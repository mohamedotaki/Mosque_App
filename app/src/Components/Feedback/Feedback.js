import "./Feedback.css";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function Feedback(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const sendFeedback = (event) => {
    event.preventDefault();

    fetch("http://localhost:3001/addfeedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, feedback }),
    })
      .then((r) => r.json())
      .then((r) => {
        if ("feedback Was Sent" === r.message) {
          console.log(r);
          setEmail("");
          setFeedback("");
          setName("");
          event.reset();
        } else {
        }
      });
  };

  return (
    <Form onSubmit={sendFeedback}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="Name"
          placeholder="example: Ahmad"
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="name@example.com"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Feedback</Form.Label>
        <Form.Control
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
  );
}
