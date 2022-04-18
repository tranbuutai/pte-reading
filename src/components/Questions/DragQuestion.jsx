import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowsMove } from "react-icons/bs";

import {
  dragQuestionActions,
  selectDragQuestionData,
} from "../../features/question/questionSlice";
import { NextButton } from "../Button";
import { Header } from "../Layout/Header";

export function DragQuestion() {
  const dispatch = useDispatch();
  const [onDragOverAnimation, setOnDragOverAnimation] = useState(0);
  const [check, setCheck] = useState(true);
  const [inParagraph, setInParagraph] = useState(false);
  const answerTemp = useRef("");

  const question = useSelector(selectDragQuestionData);
  const handleButtonClick = () => {
    const textAnswer = question.answer;
    const answer = { id: 3, answer: textAnswer };
    dispatch(dragQuestionActions.getAnswer(answer));
  };

  const updateAnswer = (e) => {
    setOnDragOverAnimation(0);
    setCheck(true);
    e.preventDefault();
    const index = {
      dropIndex: e.target.id,
      dragIndex: answerTemp.current,
      inParagraph: inParagraph ? true : false,
    };
    dispatch(dragQuestionActions.updateAnswer(index));
  };

  const handleOnDragStart = (e, check) => {
    setOnDragOverAnimation(2);
    if (check !== "inParagraph") {
      setInParagraph(false);
      return (answerTemp.current = e.target.id);
    }
    setInParagraph(true);
    return (answerTemp.current = e.target.id - 1);
  };
  const handleOnDragEnd = (e, check) => {
    setOnDragOverAnimation(0);
    return (answerTemp.current = "");
  };
  const allowDrop = (e, move) => {
    e.preventDefault();

    switch (move) {
      case "over":
        if (check) {
          setOnDragOverAnimation(1);
          setCheck(false);
        }
        break;
      case "leave":
        if (!check) {
          setOnDragOverAnimation(2);

          setCheck(true);
        }

      default:
        break;
    }
  };
  return (
    <>
      <Header title={question.title} id={question.id} />
      <div className="w-100 px-4">
        <div className="d-flex justify-content-center align-items-center">
          <div className="px-5 lh-lg">
            <p className="fw-bold fst-italic fs-5">
              In the text below some words are missing. Drag words from the box
              below to the appropriate place in the text. To undo an answer
              choice. drag the word back to the box below the text.
            </p>
            <div className="d-grid gap-3 border line-hieght-300">
              <div className="px-3">{question.paragraph.title}</div>
              <div className="px-3 ">
                {question.paragraph.text.map((paragraph) => {
                  return (
                    <div className="d-inline" key={paragraph.key}>
                      {paragraph.text}
                      {paragraph.hasAnswer &&
                        (paragraph.answer ? (
                          <div
                            className={"mx-2 my-3 px-3 drag-drop-answer"}
                            id={paragraph.key}
                            onDrop={(e) => updateAnswer(e)}
                            onDragOver={(e) => allowDrop(e, "over")}
                            onDragLeave={(e) => allowDrop(e, "leave")}
                            draggable={true}
                            onDragStart={(e) =>
                              handleOnDragStart(e, "inParagraph")
                            }
                            onDragEnd={(e) => handleOnDragEnd(e, "inParagraph")}
                            activeOnDragOverAnimation={onDragOverAnimation}
                          >
                            <BsArrowsMove size={10} /> {paragraph.answer}
                          </div>
                        ) : (
                          <span
                            className={"mx-2 my-3 px-3 drag-drop-answer"}
                            onDrop={(e) => updateAnswer(e)}
                            onDragOver={(e) => allowDrop(e, "over")}
                            onDragLeave={(e) => allowDrop(e, "leave")}
                            activeOnDragOverAnimation={onDragOverAnimation}
                            id={paragraph.key}
                          >
                            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                          </span>
                        ))}
                    </div>
                  );
                })}
              </div>
              <div className="bg-semi-silver d-flex justify-content-center justify-items-center h-auto ">
                {question.paragraph.answer.map((answer) => {
                  return (
                    answer.text && (
                      <div
                        className="mx-2 my-3 px-3 drag-drop-answer"
                        variant="outline-secondary"
                        key={answer.text}
                        id={answer.value}
                        draggable={true}
                        onDragStart={(e) => handleOnDragStart(e)}
                        onDragEnd={(e) => handleOnDragEnd(e)}
                      >
                        <BsArrowsMove size={10} /> {answer.text}
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <NextButton
        next={5}
        handleButtonClick={handleButtonClick}
        answer={question}
      />
    </>
  );
}
