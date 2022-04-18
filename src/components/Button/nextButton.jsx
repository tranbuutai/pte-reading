import * as React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function NextButton({ answer, next, handleButtonClick }) {
  return (
    <div className="d-flex justify-content-end p-5">
      <Link to={`/question/${next}`}>
        <Button
          className="next-button"
          variant="primary"
          size="lg"
          onClick={() => handleButtonClick(answer)}
        >
          Next
        </Button>
      </Link>
    </div>
  );
}
