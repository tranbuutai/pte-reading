import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {
  fillQuestionReducer,
  dragQuestionReducer,
  multipleChoiceQuestionReducer,
  questionReducer,
  reOrderQuestionReducer,
  singleChoiceQuestionReducer,
} from "../features/question/questionSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    question: questionReducer,
    fillQuestion: fillQuestionReducer,
    dragQuestion: dragQuestionReducer,
    singleChoiceQuestion: singleChoiceQuestionReducer,
    multipleChoiceQuestion: multipleChoiceQuestionReducer,
    reOrderQuestion: reOrderQuestionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
