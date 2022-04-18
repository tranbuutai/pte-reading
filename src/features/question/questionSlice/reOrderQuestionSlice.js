import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 3,
  type: "Re-order Paragraphs",
  title: "Re-order Paragraphs",
  paragraph: {
    answer: [
      {
        text: "In the urban areas, 75 percent of individuals who have taken the test have a heart age that is at least one year older than their real age. ",
        value: "0",
        index: 0,
      },
      {
        text: "A campaign has been launched to help people find out their ‘heart age’. ",
        value: "1",
        index: 1,
      },
      {
        text: "The free online heart age test asks people some basic lifestyle questions, including blood pressure, and will give an instant estimation of someone’s heart age. ",
        value: "2",
        index: 2,
      },
      {
        text: "Those who have a heart age higher than their real age are at an increased risk of heart attack or stroke. ",
        value: "3",
        index: 3,
      },

      {
        text: "Ministry of Health has created an online test in an effort to reduce the number of deaths from heart disease or stroke. ",
        value: "4",
        index: 4,
      },
    ],
  },
  isDone: false,
  answer: [
    {
      text: [],
      index: 0,
      id: "10",
    },
    {
      text: [],
      index: 1,
      id: "11",
    },
    {
      text: [],
      index: 2,
      id: "12",
    },
    {
      text: [],
      index: 3,
      id: "13",
    },
    {
      text: [],
      index: 4,
      id: "14",
    },
  ],
  result: [
    "A campaign has been launched to help people find out their ‘heart age’. ",
    "Ministry of Health has created an online test in an effort to reduce the number of deaths from heart disease or stroke. ",
    "The free online heart age test asks people some basic lifestyle questions, including blood pressure, and will give an instant estimation of someone’s heart age. ",
    "In the urban areas, 75 percent of individuals who have taken the test have a heart age that is at least one year older than their real age. ",
    "Those who have a heart age higher than their real age are at an increased risk of heart attack or stroke. ",
  ],
  point: 0,
};

const reOrderQuestionSlice = createSlice({
  name: "ReOrderQuestion",
  initialState,
  reducers: {
    //   action to saga
    getAnswer(state, action) {
      console.log(action.payload);
      state.isDone = true;
    },
    updateAnswerByQuestion(state, action) {
      const result = action.payload;

      // in case destination ==4(max length)
      if (
        state.answer[result.destination.index].text != 0 &&
        result.destination.index === 4
      ) {
        const temp = state.answer[result.destination.index].text;
        state.answer[result.destination.index].text =
          state.paragraph.answer[result.source.index].text;
        state.paragraph.answer[result.source.index].text = temp;

        return;
      }
      //if has answer in index
      if (state.answer[result.destination.index].text != 0) {
        let tempAnswer = state.answer[result.destination.index].text;
        let hasEnd = true;
        state.answer[result.destination.index].text =
          state.paragraph.answer[result.source.index].text;

        if (state.answer[4].text != 0) {
          hasEnd = false;
          state.paragraph.answer[result.source.index].text =
            state.answer[4].text;
        }
        for (
          let i = result.destination.index + 1;
          i < state.answer.length;
          i++
        ) {
          let temp = state.answer[i].text;
          state.answer[i].text = tempAnswer;
          tempAnswer = temp;
        }
        if (hasEnd) {
          state.paragraph.answer[result.source.index].text = "";
          return;
        }
        return;
      }

      // normal
      state.answer[result.destination.index].text =
        state.paragraph.answer[result.source.index].text;
      state.paragraph.answer[result.source.index].text = "";
      return;
    },
    updateAnswerByAnswer(state, action) {
      const result = action.payload;
      if (result.destination.index === result.source.index) return;
      let tempAnswer = state.answer[result.destination.index].text;
      state.answer[result.destination.index].text =
        state.answer[result.source.index].text;
      state.answer[result.source.index].text = "";

      // move answer up
      if (result.source.index > result.destination.index) {
        for (
          let i = result.destination.index + 1;
          i < result.source.index + 1;
          i++
        ) {
          let temp = state.answer[i].text;
          state.answer[i].text = tempAnswer;
          tempAnswer = temp;
        }
        return;
      }

      // move answer up down
      if (result.destination.index > result.source.index) {
        for (
          let i = result.destination.index - 1;
          i > result.source.index - 1;
          i--
        ) {
          let temp = state.answer[i].text;
          state.answer[i].text = tempAnswer;
          tempAnswer = temp;
        }
        return;
      }
    },
    removeAnswer(state, action) {
      const result = action.payload;
      const temp = state.paragraph.answer[result.destination.index].text;
      state.paragraph.answer[result.destination.index].text =
        state.answer[result.source.index].text;
      state.answer[result.source.index].text = temp;
      return;
    },
    clearData() {
      return initialState;
    },
  },
});

// action
export const reOrderQuestionActions = reOrderQuestionSlice.actions;

// selector
export const selectReOrderQuestionData = (state) => state.reOrderQuestion;

// reducer
export const reOrderQuestionReducer = reOrderQuestionSlice.reducer;
