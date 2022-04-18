import React, { useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  fillQuestionActions,
  selectFillQuestionData,
} from "../../features/question/questionSlice";
import { Header } from "../Layout/Header";
import { NextButton } from "../Button";

export function FillQuestion() {
  const dispatch = useDispatch();
  const question = useSelector(selectFillQuestionData);
  const answer = useRef({ id: 0, answer: [] });

  useEffect(() => {
    question.answer != 0 && (answer.current.answer = [...question.answer]);
  }, [question]);

  const handleSelect = (index, e) => {
    answer.current.answer[index - 1] = e.target.value;
  };
  const handleButtonClick = (answer) => {
    dispatch(fillQuestionActions.getAnswer(answer));
  };

  return (
    <>
      <Header title={question.title} id={question.id} />
      <div className="w-100 px-4">
        <div className="d-flex justify-content-center align-items-center">
          <div className="px-5 lh-lg fs-5">
            <p className="fw-bold fst-italic">
              Below is a text with blanks. Click on each blank, a list of
              choices will appear. Select the appropriate answer choice for each
              blank.
            </p>
            <div>
              {question.paragraph.map((paragraph) => {
                return (
                  <div className="d-inline" key={paragraph.key}>
                    {paragraph.text}
                    {paragraph.answer && (
                      <Form.Select
                        className="d-inline w-auto"
                        aria-label="Default select example"
                        key={paragraph.key}
                        onChange={(e) => handleSelect(paragraph.key, e)}
                      >
                        <option value={question.answer[paragraph.key - 1]}>
                          {question.answer[paragraph.key - 1]}
                        </option>
                        <option value={paragraph.answer.a}>
                          {paragraph.answer.a}
                        </option>
                        <option value={paragraph.answer.b}>
                          {paragraph.answer.b}
                        </option>
                        <option value={paragraph.answer.c}>
                          {paragraph.answer.c}
                        </option>
                        <option value={paragraph.answer.d}>
                          {paragraph.answer.d}
                        </option>
                      </Form.Select>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <NextButton
        next={2}
        handleButtonClick={handleButtonClick}
        answer={answer.current}
      />
    </>
  );
}
