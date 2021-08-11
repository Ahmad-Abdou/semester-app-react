import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import "../EmailValidation.css";
import emailjs from "emailjs-com";
function EmailValidation() {
  const [thisEmail, setThisEmail] = useState("");
  const [changed, isChanged] = useState(false);
  const onChangeHandler = (e) => {
    setThisEmail((e.target.thisEmail = e.target.value));
  };
  console.log(thisEmail);
  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_gxeje4r",
        "template_rv5qiwp",
        e.target,
        "user_syaJzmGxi5KA5yTJpzSLM"
      )
      .then(
        (result) => {
          console.log(result.text);
          isChanged(true);
          setTimeout(() => {
            isChanged(false);
          }, 5000);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <>
      {changed && (
        <Alert className="my-alert-register" variant="success">
          Request has been sent to your email
        </Alert>
      )}

      <Form className="email-form" onSubmit={(e) => sendEmail(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            className="form-email-field"
            type="email"
            placeholder="Enter email"
            onChange={onChangeHandler}
            value={thisEmail}
            name="thisEmail"
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}

export default EmailValidation;
