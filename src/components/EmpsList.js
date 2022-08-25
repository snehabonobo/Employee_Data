import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import Employee from "../services/book.services";
import { Form, Alert} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Task from "../services/task.services";

const EmpList = ({ getEmpId }) => {
  const [emp, setEmp] = useState([]);
  const [name, setName] = useState("");
  const [task, setTask] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

    useEffect(() => {
    getEmps();
  }, []);

  const getEmps = async () => {
    const data = await Employee.getAllEmp();
    console.log(data.docs);
    setEmp(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const data = await Task.getAllTask();
    console.log(data.docs);
    setTask(data.docs.map((doc) => ({ ...doc.data() })));
  };
  
  const deleteHandler = async (id) => {
    await Employee.deleteEmp(id);
    getEmps();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === "" || task === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newTask = {
      name,
      task,
    };
    console.log(newTask);
    try {
      if (name === undefined && task === "") {
        //await Employee.updateEmp(id, newEmp);
        //setEmpId("");
        //setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await Task.addTask(newTask);
        setMessage({ error: false, msg: "Added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
    setName("");
    setTask("");
};

  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getEmps}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {emp.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.name}</td>
                <td>{doc.contact}</td>
                <td>{doc.task}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getEmpId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                  
                  <Button 
                  variant="primary" 
                  onClick={handleShow}
                  >
                  Task
                  </Button>
                  <Form   >
                     <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
          <Modal.Title>Assign Task</Modal.Title>
            </Modal.Header>
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
          </div>
         <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name of the Assignee</Form.Label>
              <Form.Control
                type="name"
                placeholder= "Name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Task</Form.Label>
              <Form.Control as="textarea" rows={1}
              value={task}
              onChange={(e) => setTask(e.target.value)} 
              />
            </Form.Group>
          </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" type="Submit" onClick={handleSubmit} >
            Assign
          </Button>
          
            </Modal.Footer>
            </Modal>
            </Form>

            
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default EmpList;