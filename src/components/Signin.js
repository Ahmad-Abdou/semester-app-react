import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Signin.css";
import axios from "axios";
import { Redirect, NavLink } from "react-router-dom";

function Signin() {
  const [signin, setSignin] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  const { email, password } = signin;

  const onChangeHandler = (e) => {
    setSignin({ ...signin, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/admin/api/v1/signin", signin)
      .then((res) => {
        setIsSignedIn(true);
      })
      .catch((err) => {
        setIsSubmited(true);

        console.log(err);
      });
  };

  return (
    <div className="container">
      {isSignedIn && <Redirect to="/menu"></Redirect>}
      <h2 className="title">Admin</h2>
      <h6 className="paragraph">Logga in på ditt Admin konto</h6>
      <Form onSubmit={onSubmitHandler}>
        {isSubmited && (
          <Alert className="my-alert" variant="danger">
            Invalid email or password
          </Alert>
        )}
        <Form.Control
          className="form-field"
          type="text"
          placeholder="Enter email"
          onChange={onChangeHandler}
          name="email"
          value={email}
        />

        <Form.Control
          className="form-field"
          type="password"
          placeholder="Password"
          onChange={onChangeHandler}
          value={password}
          name="password"
        />
        <NavLink
          className="ml-5 "
          exact
          to="/emailvalid"
          activeClassName="activeClicked"
        >
          Forgot Password!
        </NavLink>
        <Button type="submit" className="btn">
          Anslut
        </Button>
      </Form>
    </div>
  );
}

export default Signin;
