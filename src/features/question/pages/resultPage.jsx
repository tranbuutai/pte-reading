import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { questionActions, selectQuestionData } from "../questionSlice";

export function ResultPage() {
  const dispatch = useDispatch();
  const question = useSelector(selectQuestionData);

  const handleButtonClick = () => {
    dispatch(questionActions.clearData());
  };

  useEffect(() => {
    dispatch(questionActions.addTotalPoint());
  });
  return (
    <>
      <div className="d-flex fs-4">
        {question.isDone && <div>result: {question.totalPoint}</div>}
      </div>
      <>
        {question.totalPoint === 17 && (
          <div className="text-center m-5 fs-6 text-uppercase fw-bold">
            Congratulation you have got highest marks
          </div>
        )}
        <div className="d-flex justify-content-evenly align-items-center h-400px ">
          <Link to="/">
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleButtonClick()}
            >
              Again
            </Button>
          </Link>
        </div>
      </>
    </>
  );
}
