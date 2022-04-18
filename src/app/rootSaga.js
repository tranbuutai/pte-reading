import { all } from "redux-saga/effects";
import {
  clearDataSaga,
  resultByQuestionSaga,
  totalResultsSaga,
} from "../features/question/questionSaga";

export default function* rootSaga() {
  yield all([resultByQuestionSaga(), totalResultsSaga(), clearDataSaga()]);
}
