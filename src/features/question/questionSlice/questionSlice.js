import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkDone: [false, false, false, false, false],
  answer: [[], [], [], [], []],
  result: [
    ["popular", "domesticated", "flourish", "aiding", "improved"],
    ["1", "3"],
    [
      "A campaign has been launched to help people find out their ‘heart age’. ",
      "Ministry of Health has created an online test in an effort to reduce the number of deaths from heart disease or stroke. ",
      "The free online heart age test asks people some basic lifestyle questions, including blood pressure, and will give an instant estimation of someone’s heart age. ",
      "In the urban areas, 75 percent of individuals who have taken the test have a heart age that is at least one year older than their real age. ",
      "Those who have a heart age higher than their real age are at an increased risk of heart attack or stroke. ",
    ],
    ["theoretical", "analytical", "ultimate", "flexible"],
    ["3"],
  ],
  isStart: false,
  isDone: false,
  pointOfQuestion: [[], [], [], [], []],
  process: 20,
  totalPoint: 0,
};
const questionSlice = createSlice({
  name: "Question",
  initialState,
  reducers: {
    //   action to saga

    updateAnswerOfUser(state, action) {
      state.answer[action.payload.id] = action.payload.answer;
      state.pointOfQuestion[action.payload.id] = 0;
      // update process
      !state.checkDone[action.payload.id] &&
        state.process < 100 &&
        (state.process += 20);

      // check answer with result
      // in case multiple choice question, multiple answer
      if (action.payload.id === 1) {
        for (var i = 0; i < state.result[1].length; i++) {
          if (state.answer[1].find((answer) => answer === state.result[1][i])) {
            state.pointOfQuestion[action.payload.id] += 1;
          }
        }
        console.log(state.pointOfQuestion[action.payload.id]);
        state.checkDone[action.payload.id] = true;
        return;
      }

      // normal
      for (var i = 0; i < state.answer[action.payload.id].length; i++) {
        if (
          state.answer[action.payload.id][i] ===
          state.result[action.payload.id][i]
        ) {
          state.pointOfQuestion[action.payload.id] += 1;
        }
      }
      state.checkDone[action.payload.id] = true;

      console.log(state.pointOfQuestion[action.payload.id]);
    },

    addTotalPoint(state, action) {
      state.totalPoint = state.pointOfQuestion.reduce((pv, cv) => pv + cv, 0);
    },
    startExam(state, action) {
      console.log("start");
      state.isDone = false;
      state.isStart = true;
    },
    endExam(state, action) {
      console.log("end");
      state.isDone = true;
      state.isStart = false;
    },

    clearData() {
      return initialState;
    },
  },
});

// action
export const questionActions = questionSlice.actions;

// selector
export const selectQuestionData = (state) => state.question;

// reducer
export const questionReducer = questionSlice.reducer;
