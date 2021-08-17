import React, { useState, useEffect } from "react";
import { RiLogoutBoxRLine, RiCalendarCheckLine } from "react-icons/ri";
import { Link, Redirect } from "react-router-dom";
import Signout from "./Signout";
import axios from "axios";

function Menu() {
  const [isSignedOut, setIsSignedOut] = useState(false);
  const [signedInUser, setSignedInUser] = useState("");
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
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/signin/myuser")
      .then((res) => {
        setSignedInUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      {isSignedOut && <Redirect to="/"></Redirect>}
      {signedInUser === "SUPERVISOR" ? (
        <div>
          <h2 className="my-title">Semesterappen Super Admin</h2>
          <h3 className="my-admin">Super Admin</h3>
          <Link to="/organisationer" className="org-link">
            <h2 className="main-icon">
              <RiCalendarCheckLine className="text-organisation"></RiCalendarCheckLine>
              Organisationer
            </h2>
          </Link>
        </div>
      ) : (
        <div>
          <h2 className="my-title">Semesterappen Admin</h2>
          <h3 className="my-admin">Admin</h3>
          <Link to="/request" className="org-link">
            <h2 className="main-icon">
              <RiCalendarCheckLine className="text-organisation"></RiCalendarCheckLine>
              Requests
            </h2>
          </Link>
        </div>
      )}

      <h2 className="logout" onClick={signOut}>
        <RiLogoutBoxRLine className="text-organisation"></RiLogoutBoxRLine>
        Logga ut
      </h2>
      <Signout></Signout>
    </div>
  );
}

export default Menu;
