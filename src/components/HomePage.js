import React, {useState, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { auth} from "../firebase";
import { useNavigate } from "react-router-dom";
import AddBook from "./AddEmp";
import BooksList from "./EmpsList";
import "./HomePage.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function App({isAuth}) {
  const [empId, setEmpId] = useState("");
  
  let navigate = useNavigate();
  const getEmpIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setEmpId(id);
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, []);
  return (
    <>
      
      

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddBook id={empId} setEmpId={setEmpId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <BooksList getEmpId={getEmpIdHandler} />
          </Col>
        </Row>
      </Container>
      
    </>
  );
}
export default App;