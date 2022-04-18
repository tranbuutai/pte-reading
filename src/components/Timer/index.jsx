import prettyMilliseconds from "pretty-ms";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiTimeFive } from "react-icons/bi";

import {
  selectQuestionData,
  questionActions,
} from "../../features/question/questionSlice/questionSlice";
export const Timer = () => {
  const question = useSelector(selectQuestionData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [time, setTime] = useState(question.isStart ? 300 : 0);

  useEffect(() => {
    if (time > 0) {
      setTimeout(() => setTime(time - 1), 1000);
    } else {
      dispatch(questionActions.endExam());
      navigate("/question/result");
    }
  });

  return (
    <p className="position-absolute left-80 px-4 fs-5" style={{ top: " 4%" }}>
      <BiTimeFive className="mx-2" />
      {prettyMilliseconds(time * 1000, { colonNotation: true })}/ 5:00
    </p>
  );
};
