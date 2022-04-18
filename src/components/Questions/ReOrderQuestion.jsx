import React, { useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { RiArrowLeftRightFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import {
  reOrderQuestionActions,
  selectReOrderQuestionData,
} from "../../features/question/questionSlice";
import { Header } from "../Layout/Header";
import { NextButton } from "../Button";
import { OrderAnswer } from "../OrderAnswer";

export function ReOrderQuestion() {
  const dispatch = useDispatch();
  const question = useSelector(selectReOrderQuestionData);
  const [checkValue, setCheckValue] = useState(true);
  const handleOnDragEnd = (result) => {
    if (checkValue) {
      try {
        if (result.destination.index >= question.answer.length) return;
        const check = {
          source: result.source.droppableId,
          destination: result.destination.droppableId,
        };
        if (check.source === "question" && check.destination === "answer") {
          dispatch(reOrderQuestionActions.updateAnswerByQuestion(result));
          return setCheckValue(true);
        }
        if (check.source === "answer" && check.destination === "answer") {
          dispatch(reOrderQuestionActions.updateAnswerByAnswer(result));
          return setCheckValue(true);
        }
        if (check.source === "answer" && check.destination === "question") {
          dispatch(reOrderQuestionActions.removeAnswer(result));
          return setCheckValue(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    return setCheckValue(true);
  };

  const handleOnDragStart = (result) => {
    if (
      (result.source.droppableId === "answer" &&
        question.answer[result.source.index].text == 0) ||
      (result.source.droppableId === "question" &&
        question.paragraph.answer[result.source.index].text == 0)
    ) {
      setCheckValue(false);
    }
  };

  const handleButtonClick = (question) => {
    const textAnswer = question.answer.map((a) => a.text);
    const answer = { id: 2, answer: textAnswer };
    dispatch(reOrderQuestionActions.getAnswer(answer));
  };

  return (
    <>
      <Header
        title={question.title}
        id={question.id}
        handleButtonClick={handleButtonClick}
        answer={question}
      />
      <div className="w-100 px-4 fs-5">
        <p className="p-4 fw-bold fst-italic text-center">
          The text boxes in the left panel have been placed in random order.
          Restore the original order by dragging the text boxes from the left
          panel to the right panel.
        </p>
        <Row className="m-0 justify-content-center  mx-5">
          <DragDropContext
            onDragEnd={handleOnDragEnd}
            onDragStart={handleOnDragStart}
          >
            <Col className="px-4">
              <Table hover size="xl" className=" text-white">
                <thead className="bg-gray">
                  <tr>
                    <th className="text-center pb-3">Source</th>
                  </tr>
                </thead>

                <Droppable
                  droppableId="question"
                  isDropDisabled={checkValue ? false : true}
                >
                  {(provided) => (
                    <tbody
                      className="bg-white text-black"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {question.paragraph.answer.map((answer) => (
                        <OrderAnswer
                          answer={answer}
                          key={answer.value}
                          id={answer.value}
                          index={answer.index}
                          questionType="beforeReOrder"
                        />
                      ))}
                      {provided.placeholder}
                    </tbody>
                  )}
                </Droppable>
              </Table>
            </Col>
            <Col
              xs={1}
              className="d-flex align-items-center justify-content-center"
            >
              <RiArrowLeftRightFill size={50} color={"#686464"} />
            </Col>

            <Col className="px-4">
              <Table hover size="xl" className=" text-white">
                <thead className="bg-gray">
                  <tr>
                    <th className="text-center pb-3">Target</th>
                  </tr>
                </thead>
                <Droppable
                  droppableId="answer"
                  isDropDisabled={checkValue ? false : true}
                >
                  {(provided) => (
                    <tbody
                      className="bg-white text-black"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {question.answer.map((answer) => (
                        <OrderAnswer
                          answer={answer}
                          key={answer.index}
                          id={answer.id}
                          index={answer.index}
                          questionType="afterReOrder"
                        />
                      ))}
                      {provided.placeholder}
                    </tbody>
                  )}
                </Droppable>
              </Table>
            </Col>
          </DragDropContext>
        </Row>
      </div>
      <NextButton
        next={4}
        prev={2}
        handleButtonClick={handleButtonClick}
        answer={question}
      />
    </>
  );
}
