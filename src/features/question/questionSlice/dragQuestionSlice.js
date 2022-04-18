import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 4,
  type: "Fill In The Blanks",
  title: "Fill In The Blanks",
  paragraph: {
    text: [
      {
        text: "Our programme will develop your ",
        key: 1,
        answer: "",
        hasAnswer: true,
      },
      {
        text: " knowledge of Computer Science and your problem-solving and ",
        key: 2,
        answer: "",
        hasAnswer: true,
      },
      {
        text: " skills while enabling you to achieve the ",
        key: 3,
        answer: "",
        hasAnswer: true,
      },
      {
        text: " qualification for the IT professional. The programme structure is extremely ",
        key: 4,
        answer: "",
        hasAnswer: true,
      },
      {
        text: ", enabling you to personalise your MSc through a wide range of electives.",
        key: 5,
        answer: "",
        hasAnswer: false,
      },
    ],
    answer: [
      {
        text: "ultimate",
        value: 0,
      },
      {
        text: "variable",
        value: 1,
      },
      {
        text: "analytical",
        value: 2,
      },
      {
        text: "flexible",
        value: 3,
      },

      {
        text: "theoretical",
        value: 4,
      },

      {
        text: "considerable",
        value: 5,
      },

      {
        text: "decisive",
        value: 6,
      },
    ],
    title: "Master of Science in information Technology (MSC in IT) ",
  },
  isDone: false,
  answer: [],
  result: ["theoretical", "analytical", "ultimate", "flexible"],
  point: 0,
};

const dragQuestionSlice = createSlice({
  name: "DragQuestion",
  initialState,
  reducers: {
    //   action to saga
    getAnswer(state, action) {
      state.isDone = true;
    },

    updateAnswer(state, action) {
      const { dropIndex, dragIndex, inParagraph } = action.payload;
      const temp = state.paragraph.text[dropIndex - 1].answer;

      // move answer to paragraph
      if (!inParagraph) {
        state.answer[dropIndex - 1] = state.paragraph.answer[dragIndex].text;
        state.paragraph.text[dropIndex - 1].answer =
          state.paragraph.answer[dragIndex].text;
        state.paragraph.answer[dragIndex].text = temp;
        return;
      }

      //update in paragraph

      //update answer in state
      state.answer[dropIndex - 1] = state.paragraph.text[dragIndex].answer;
      state.answer[dragIndex] = temp;

      //update to ui
      state.paragraph.text[dropIndex - 1].answer =
        state.paragraph.text[dragIndex].answer;
      state.paragraph.text[dragIndex].answer = temp;
      return;
    },
    clearData() {
      return initialState;
    },
  },
});

// action
export const dragQuestionActions = dragQuestionSlice.actions;

// selector
export const selectDragQuestionData = (state) => state.dragQuestion;

// reducer
export const dragQuestionReducer = dragQuestionSlice.reducer;
