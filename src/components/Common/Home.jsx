import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { questionActions } from "../../features/question/questionSlice";

export function Home() {
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    dispatch(questionActions.startExam());
  };
  useEffect(() => {
    dispatch(questionActions.endExam());
  });
  console.log(process.env.REACT_APP_TEST)
  return (
    <>
      <h1 className="text-center m-5">Ready?</h1>
      <div className="d-flex justify-content-evenly align-items-center h-400px ">
        <Link to="/question/1">
          <Button
            variant="primary"
            size="lg"
            onClick={() => handleButtonClick()}
          >
            Hit  here {process.env.REACT_APP_ASD}
          </Button>
        </Link>
      </div>
    </>
  );
}
