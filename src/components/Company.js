import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import axios from "axios";

function Company() {
  const [adding, isAdding] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: "",
    orgnum: "",
    adress: "",
    admin: "",
    email: "",
    tel: "",
  });
  const onChangeHandlar = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  };

  const addCompany = () => {
    axios.post("http://localhost:8080/api/v1/company");
  };

  const submitHandlar = (e) => {
    e.preventDefault();
  };
  return (
    <Form onSubmit={addCompany}>
      <Modal
        show={adding}
        onHide={() => isAdding(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header className="modal-headers" closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <input
              type="text"
              placeholder="Company name"
              onChange={onChangeHandlar}
              name={newCompany.name}
              value={newCompany.name}
            ></input>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="org-body">
            <div className="first-body">
              <p></p>
              <p>
                <span className="field"> Adress :</span>{" "}
                <input
                  type="text"
                  placeholder="Company name"
                  onChange={onChangeHandlar}
                  name={newCompany.adress}
                  value={newCompany.adress}
                ></input>
              </p>
            </div>
            <div className="second-body">
              <p>
                <span className="field">Administratör :</span>{" "}
                <input
                  type="text"
                  placeholder="Company name"
                  onChange={onChangeHandlar}
                  name={newCompany.admin}
                  value={newCompany.admin}
                ></input>
              </p>
              <p>
                <span className="field">Email : </span>
                <input
                  type="text"
                  placeholder="Company name"
                  onChange={onChangeHandlar}
                  name={newCompany.email}
                  value={newCompany.email}
                ></input>
              </p>
              <p>
                <input
                  type="text"
                  placeholder="Company name"
                  onChange={onChangeHandlar}
                  name={newCompany.tel}
                  value={newCompany.tel}
                ></input>
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              submitHandlar();
              isAdding(false);
            }}
            className="add-btn"
          >
            Lägg till
          </button>
        </Modal.Body>
      </Modal>
    </Form>
  );
}

export default Company;
