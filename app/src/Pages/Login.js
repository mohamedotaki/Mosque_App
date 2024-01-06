import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./css/Login.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { apiLink } from "../db/dbFunctions";

export default function Login(props) {
  var email = "";
  var password = "";
  const password1 = useRef();
  const email1 = useRef();
  const navigate = useNavigate();

  const logIn = (event) => {
    event.preventDefault(); // 👈️ prevent page refresh

    password = password1.current.value;
    email = email1.current.value;
    fetch(apiLink("auth"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        if ("success" === r.message) {
          console.log(r);
          localStorage.setItem(
            "user",
            JSON.stringify({
              email,
              userType: r.userType,
              isSignedIn: true,
              token: r.token,
            })
          );
          navigate("/");
          //window.location.reload(false);
          //props.setLoggedIn(true);
          //props.setEmail(email);
          //navigate("/Home");
        } else {
          window.alert(r.message);
        }
      });
  };

  return (
    <>
      <Form className="Login" onSubmit={logIn}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={email1} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={password1}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Stay logged in" />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}
