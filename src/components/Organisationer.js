import React, { useState, useEffect } from "react";
import { RiSettings4Fill, RiAddFill } from "react-icons/ri";
import { IoIosArrowDropleftCircle, IoMdSearch } from "react-icons/io";
import "../Organisation.css";
import Signout from "./Signout";
import { Link } from "react-router-dom";
import { Modal, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { VscLoading } from "react-icons/vsc";
function Organisationer() {
  const [showing, isShowing] = useState(false);
  const [searching, isSearching] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loading, isLoading] = useState(false);
  const [myCompany, setMyCompany] = useState({
    name: "",
    adress: "",
    admin: "",
    email: "",
    tel: "",
    pause: false,
  });
  const [myId, setMyId] = useState("");
  const [adding, isAdding] = useState(false);
  const [pausing, setPausing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: "",
    adress: "",
    admin: "",
    email: "",
    tel: "",
    pause: false,
  });
  const [search, setSearch] = useState("");
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [signedInUser, setSignedInUser] = useState("");

  const deleteById = (id) => {
    axios
      .delete(`http://localhost:8080/api/v1/company/${id}`)
      .then((res) => {
        setDeleting(true);
        setTimeout(() => {
          setDeleting(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showCompany = (id) => {
    let company = companies.find((thecompany) => thecompany.id === id);
    setMyCompany(company);
    setMyId(company.id);
    return company;
  };
  const fetchCompanies = () => {
    axios
      .get("http://localhost:8080/api/v1/company")
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChangeHandlar = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  };

  const addingCompany = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/v1/company", newCompany)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const updatingStatus = (id) => {
    axios
      .put(`http://localhost:8080/api/v1/company/pause/${id}?pause/`)
      .then((res) => {
        setPausing(true);
        isLoading(true);
        setTimeout(() => {
          setNewCompany({ ...myCompany, pause: res.data.pause });
          isLoading(false);
          isShowing(false);
          setPausing(false);
          window.location.reload(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  companies.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  useEffect(() => {
    fetchCompanies();
    axios
      .get("http://localhost:8080/api/v1/signin/myuser")
      .then((res) => {
        setSignedInUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setFilteredSearch(
      companies.filter((thecompany) => {
        return thecompany.name.toLowerCase().includes(search.toLowerCase());
      })
    );
    // eslint-disable-next-line
  }, [companies, search]);

  return (
    <div className="container">
      {signedInUser === "SUPERVISOR" ? (
        <div className="header">
          <Link to="/menu">
            <IoIosArrowDropleftCircle className="header-icon"></IoIosArrowDropleftCircle>
          </Link>
          Super Admin
        </div>
      ) : (
        <div className="header">
          <Link to="/menu">
            <IoIosArrowDropleftCircle className="header-icon"></IoIosArrowDropleftCircle>
          </Link>
          Admin
        </div>
      )}

      <div className="data-container">
        {filteredSearch.map((thecompany) => {
          const { id, name, pause } = thecompany;
          return (
            <div className="part" key={id}>
              <div className="content">
                <p className="header-name">{name} </p>
                <RiSettings4Fill
                  onClick={() => {
                    isShowing(!showing);
                    showCompany(id);
                  }}
                  className="edit-icon"
                ></RiSettings4Fill>
                <p className="header-lowercase">{name}</p>
                <p>
                  <span className="field">Status :</span>{" "}
                  {pause === false ? (
                    <span className="unpause-color">{"Activated"}</span>
                  ) : (
                    <span className="pause-color">{"Deactivated"}</span>
                  )}
                </p>
                {deleting && (
                  <Alert className="my-alert" variant="danger">
                    Company deleted Successfully
                  </Alert>
                )}

                <Modal
                  show={showing}
                  onHide={() => isShowing(false)}
                  dialogClassName="modal-90w"
                  aria-labelledby="example-custom-modal-styling-title"
                >
                  <Modal.Header className="modal-headers" closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                      <h3 className="org-header">{myCompany.name}</h3>
                    </Modal.Title>
                    <p className="org-title">{myCompany.name}</p>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="org-body">
                      <div className="first-body">
                        <p>
                          <span className="field">Org num :</span>{" "}
                          {myCompany.id}
                        </p>
                        <p>
                          <span className="field"> Adress :</span>{" "}
                          {myCompany.adress}
                        </p>
                      </div>
                      <div className="second-body">
                        <p>
                          <span className="field">Administratör :</span>{" "}
                          {myCompany.admin}
                        </p>
                        <p>
                          <span className="field">Email : </span>
                          {myCompany.email}
                        </p>
                        <p>
                          <span className="field">Tel :</span> {myCompany.tel}
                        </p>
                        <p>
                          <span className="field">Status :</span>{" "}
                          {myCompany.pause === false ? (
                            <span className="unpause-color">{"Activated"}</span>
                          ) : (
                            <span className="pause-color">{"Deactivated"}</span>
                          )}
                        </p>
                      </div>
                    </div>
                    {loading && <VscLoading className="loading"></VscLoading>}
                    {myCompany.pause === false ? (
                      <button
                        onClick={() => updatingStatus(myId)}
                        className="pause-btn"
                      >
                        PAUS
                      </button>
                    ) : (
                      <button
                        onClick={() => updatingStatus(myId)}
                        className="unpause-btn"
                      >
                        PAUSA
                      </button>
                    )}

                    <button
                      onClick={() => {
                        deleteById(myId);
                        isShowing(false);
                      }}
                      className="delete-btn"
                    >
                      RADERA
                    </button>
                    {pausing && (
                      <Alert className="my-alert" variant="info">
                        Status Updated Successfully
                      </Alert>
                    )}
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        show={adding}
        onHide={() => isAdding(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Form onSubmit={addingCompany}>
          <Modal.Header className="modal-headers" closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              <Form.Control
                className="form-field"
                type="text"
                placeholder="Company name"
                onChange={onChangeHandlar}
                name="name"
                value={newCompany.name}
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="org-body">
              <div className="first-body">
                <p></p>
                <Form.Control
                  className="form-field"
                  type="text"
                  placeholder="Adress"
                  onChange={onChangeHandlar}
                  name="adress"
                  value={newCompany.adress}
                />
              </div>
              <div className="second-body">
                <p>
                  <Form.Control
                    className="form-field"
                    type="text"
                    placeholder="Admin"
                    onChange={onChangeHandlar}
                    name="admin"
                    value={newCompany.admin}
                  />
                </p>
                <p>
                  <Form.Control
                    className="form-field"
                    type="text"
                    placeholder="Email"
                    onChange={onChangeHandlar}
                    name="email"
                    value={newCompany.email}
                  />
                </p>
                <p>
                  <Form.Control
                    className="form-field"
                    type="text"
                    placeholder="Tel"
                    onChange={onChangeHandlar}
                    name="tel"
                    value={newCompany.tel}
                  />
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                isAdding(false);
              }}
              type="submit"
              className="add-btn"
            >
              Lägg till
            </button>
          </Modal.Body>
        </Form>
      </Modal>
      <div className="my-body">
        <IoMdSearch
          className="search-icon"
          onClick={() => isSearching(!searching)}
        ></IoMdSearch>
        <Modal
          show={searching}
          onHide={() => isSearching(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header className="search-bar" closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              <input
                className="search-input"
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </Modal.Title>
          </Modal.Header>
        </Modal>
        <RiAddFill
          onClick={() => isAdding(!adding)}
          className="add-icon"
        ></RiAddFill>
      </div>
      <Signout></Signout>
    </div>
  );
}

export default Organisationer;
