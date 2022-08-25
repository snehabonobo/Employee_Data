import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button } from "react-bootstrap";
import Employee from "../services/book.services";
 
const AddBook = ({ id, setEmpId }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === "" || contact === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    
    const newEmp = {
      name,
      contact,
    };
    console.log(newEmp);
   
    try {
        if (id !== undefined && id !== "") {
          await Employee.updateEmp(id, newEmp);
          setEmpId("");
          setMessage({ error: false, msg: "Updated successfully!" });
        } else {
          await Employee.addEmp(newEmp);
          setMessage({ error: false, msg: "Added successfully!" });
        }
      } catch (err) {
        setMessage({ error: true, msg: err.message });
      }
  
      setName("");
      setContact("");
};

const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await Employee.getEmp(id);
      console.log("the record is :", docSnap.data());
      setName(docSnap.data().name);
      setContact(docSnap.data().contact);
      } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };
  
useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box">
      {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBookTitle">
            <InputGroup>
              
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              
              <Form.Control
                type="number"
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddBook;