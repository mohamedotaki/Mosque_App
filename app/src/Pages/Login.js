import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./css/Login.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../db/dbFunctions";

export default function Login(props) {
  const password = useRef();
  const email = useRef();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // 👈️ prevent page refresh
    login(email.current.value, password.current.value).then((res) => {
      console.log(res);
      if (res.message) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: email.current.value,
            userType: res.userType,
            isSignedIn: res.message,
            token: res.token,
          })
        );
        navigate("/");
      }
    });
  };

  return (
    <>
      <Form className="Login" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={email} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={password} />
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
