import * as React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function NextButton({ next, prev, answer, handleButtonClick }) {
  return (
    <div
      className={`d-flex p-5 ${
        prev ? "justify-content-between" : "justify-content-end"
      }`}
    >
      {prev && (
        <Link to={`/question/${prev}`}>
          <Button
            className="next-button"
            variant="primary"
            size="lg"
            onClick={() => handleButtonClick(answer)}
          >
            Prev
          </Button>
        </Link>
      )}
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
