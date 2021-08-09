import React, { useState } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Redirect } from "react-router-dom";
import "../Signout.css";
import axios from "axios";

function Signout() {
  const [isSignedOut, setIsSignedOut] = useState(false);

  const signOut = () => {
    axios
      .post("http://localhost:8080/api/v1/signin/signout")
      .then((res) => {
        setIsSignedOut(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="signout-container">
      <div className="my-border"></div>
      <footer className="logout-icon">
        {isSignedOut && <Redirect to="/"></Redirect>}
        <RiLogoutBoxRLine onClick={signOut}></RiLogoutBoxRLine>
      </footer>
    </div>
  );
}

export default Signout;
