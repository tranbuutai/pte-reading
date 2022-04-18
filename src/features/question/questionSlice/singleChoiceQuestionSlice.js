import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 5,
  type: "Single Choice",
  title: "Multiple Choice, Single Answer",
  paragraph: {
    text: [
      "Physical exercises are vital to general health. The working man, however, is likely to get enough of it from his daily work, but those with sedentary habits, especially those working indoors, will not get enough exercise from their activities.",
      "While the gym is popular and it has done a lot to make weak people strong, It not advisable for anyone to take more than very simple exercises without a doctor's advice. Exercises can be done in the bedroom with the use of light dumbbells or without the use of any apparatus at all.",
      "Walking is the best of all because it can be enjoyed by those in poor health or physically weak. It takes one out of the doors, and exercising out of the doors is much better than exercising in a closed room. If you exercise at home, open all the windows.",
      "Everyone should walk in the open air at least two miles a day unless they are very weak. Take long breaths in the open air every morning. Overexercise and much of that practised by athletes injure the heart and work opposite from the intention. No strenuous exercise should be taken after mid-life without a physician's advice.",
    ],
    answer: [
      {
        text: "People with desk-bound jobs get sufficient physical exercise.",
        value: "0",
      },
      {
        text: "Exercising at home is much better than exercising out of the doors.",
        value: "1",
      },
      {
        text: "Regular walking is only helpful if you are physically weak.",
        value: "2",
      },
      {
        text: "Vigorous exercise may be performed safely after midlife with the guidance of a doctor.",
        value: "3",
      },
    ],
    question: "What is the writer's conclusion about exercise?",
  },
  isDone: false,
  answer: "",
  result: ["3"],
  point: 0,
};

const singleChoiceQuestionSlice = createSlice({
  name: "SingleChoiceQuestion",
  initialState,
  reducers: {
    //   action to saga
    getAnswer(state, action) {
      state.isDone = true;
    },
    updateAnswer(state, action) {
      state.answer = action.payload;
    },
    clearData() {
      return initialState;
    },
  },
});

// action
export const singleChoiceQuestionActions = singleChoiceQuestionSlice.actions;

// selector
export const selectSingleChoiceQuestionData = (state) =>
  state.singleChoiceQuestion;

// reducer
export const singleChoiceQuestionReducer = singleChoiceQuestionSlice.reducer;
