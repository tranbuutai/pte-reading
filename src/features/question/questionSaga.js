import { all, put, takeLatest } from "redux-saga/effects";
import {
  dragQuestionActions,
  fillQuestionActions,
  multipleChoiceQuestionActions,
  questionActions,
  reOrderQuestionActions,
  singleChoiceQuestionActions,
} from "./questionSlice";

function* handleQuestion(payload) {
  try {
    yield put(questionActions.updateAnswerOfUser(payload.payload));
  } catch (error) {
    console.log(error.message);
  }
}
function* changeDoneStatus(payload) {
  try {
    yield put(questionActions.updateAnswerOfUser(payload.payload));
    yield put(questionActions.endExam());
  } catch (error) {
    console.log(error.message);
  }
}

function* clearData() {
  console.log("first");
  yield all([
    put(fillQuestionActions.clearData()),
    put(multipleChoiceQuestionActions.clearData()),
    put(reOrderQuestionActions.clearData()),
    put(dragQuestionActions.clearData()),
    put(singleChoiceQuestionActions.clearData()),
  ]);
}

export function* resultByQuestionSaga() {
  yield takeLatest(
    [
      fillQuestionActions.getAnswer.type,
      multipleChoiceQuestionActions.getAnswer.type,
      reOrderQuestionActions.getAnswer.type,
      dragQuestionActions.getAnswer.type,
    ],
    handleQuestion
  );
}

export function* totalResultsSaga() {
  yield takeLatest(
    [singleChoiceQuestionActions.getAnswer.type],
    changeDoneStatus
  );
}

export function* clearDataSaga() {
  yield takeLatest([questionActions.clearData.type], clearData);
}
