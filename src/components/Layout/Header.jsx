import React from "react";
import { Button, Nav, Navbar, ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectQuestionData } from "../../features/question/questionSlice/questionSlice";

export function Header({ title, id, countdownTime }) {
  const question = useSelector(selectQuestionData);
  const handleButtonClick = () => {
    console.log("object");
  };
  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="py-2">{title}</h1>
        <div className="d-flex justify-content-end align-items-center fs-5">
          <p className="px-5 mt-3">{id} of 5</p>
          <Navbar bg="light" expand="true">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto header-button">
                <Link to="/question/1">
                  <Button
                    variant="outline-dark"
                    onClick={() => handleButtonClick(1)}
                  >
                    Question 1.
                  </Button>
                </Link>
                <Link to="/question/2">
                  {" "}
                  <Button
                    variant="outline-dark"
                    onClick={() => handleButtonClick(1)}
                  >
                    Question 2.
                  </Button>
                </Link>
                <Link to="/question/3">
                  {" "}
                  <Button
                    variant="outline-dark"
                    onClick={() => handleButtonClick(1)}
                  >
                    Question 3.
                  </Button>
                </Link>
                <Link to="/question/4">
                  {" "}
                  <Button
                    variant="outline-dark"
                    onClick={() => handleButtonClick(1)}
                  >
                    Question 4.
                  </Button>
                </Link>
                <Link to="/question/5">
                  {" "}
                  <Button
                    variant="outline-dark"
                    onClick={() => handleButtonClick(1)}
                  >
                    Question 5.
                  </Button>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
      <ProgressBar now={question.process} />
    </div>
  );
}
