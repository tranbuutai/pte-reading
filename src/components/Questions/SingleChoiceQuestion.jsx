import React, { useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  singleChoiceQuestionActions,
  selectSingleChoiceQuestionData,
} from "../../features/question/questionSlice";
import { NextButton } from "../Button";
import { Header } from "../Layout/Header";

export function SingleChoiceQuestion() {
  const dispatch = useDispatch();
  const question = useSelector(selectSingleChoiceQuestionData);
  const answer = useRef({ id: 4, answer: null });

  const handleButtonClick = (question) => {
    const answer = { id: 4, answer: question.answer };
    dispatch(singleChoiceQuestionActions.getAnswer(answer));
  };

  const handleButtonEndClick = (question) => {
    const answer = { id: 4, answer: question.answer };
    dispatch(singleChoiceQuestionActions.endExam(answer));
  };

  const HandleOnChange = (e) => {
    dispatch(singleChoiceQuestionActions.updateAnswer(e.target.value));
  };

  return (
    <>
      <Header
        title={question.title}
        id={question.id}
        handleButtonClick={handleButtonClick}
        answer={question}
      />
      <div className="w-100 px-4">
        <Row className="m-0 justify-content-center">
          <Col className="mx-4">
            {question.paragraph.text.map((paragraph) => (
              <p className="w-75 px-4 fs-5" key={paragraph}>
                {paragraph}
                <br />
              </p>
            ))}
          </Col>
          <Col className="p-0">
            <p className="fw-bold fst-italic pt-2">
              Below is a text with blanks. Click on each blank, a list of
              choices will appear. Select the appropriate answer choice for each
              blank.
            </p>
            <p className="py-5">{question.paragraph.question}</p>
            <Form className="d-grid gap-5">
              {question.paragraph.answer.map((answer) => (
                <Form.Check
                  onChange={HandleOnChange}
                  type="radio"
                  name="group1"
                  defaultChecked={
                    question.answer === answer.value ? true : false
                  }
                  label={answer.text}
                  value={answer.value}
                  key={answer.value}
                />
              ))}
            </Form>
          </Col>
        </Row>
      </div>
      <NextButton
        next={"result"}
        prev={4}
        handleButtonClick={handleButtonEndClick}
        answer={question}
      />
    </>
  );
}
