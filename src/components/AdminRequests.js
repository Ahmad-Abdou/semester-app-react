import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowDropleftCircle, IoMdSearch } from "react-icons/io";
import "../Organisation.css";
import Signout from "./Signout";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "../Request.css";
function AdminRequests() {
  const [request, setRequest] = useState([]);

  const acceptRequest = (id) => {
    axios
      .post(`http://localhost:8080/admin/api/v1/request/accept/${id}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const declineRequest = (id) => {
    axios
      .post(`http://localhost:8080/admin/api/v1/request/decline/${id}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/api/v1/request/")
      .then((res) => {
        setRequest(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [request]);
  return (
    <div className="container">
      <div className="header">
        <Link to="/menu">
          <IoIosArrowDropleftCircle className="header-icon"></IoIosArrowDropleftCircle>
        </Link>
        Admin
      </div>
      <div className="data-container">
        {request.map((myRequest) => {
          const { id, user, company } = myRequest;
          return (
            <div className="part" key={id}>
              <div className="content">
                <p className="header-name">
                  Employee : {user.firstName} {user.lastName}{" "}
                </p>

                <p className="header-lowercase">
                  Company Name : {company.name}
                </p>
                <button
                  onClick={() => acceptRequest(id)}
                  className="accept-btn"
                >
                  Accept
                </button>
                <button
                  onClick={() => declineRequest(id)}
                  className="decline-btn"
                >
                  Decline
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Signout></Signout>
    </div>
  );
}

export default AdminRequests;
