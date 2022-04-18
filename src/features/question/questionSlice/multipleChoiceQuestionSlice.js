import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 2,
  type: "Multiple Choice",
  title: "Multiple Choice, Multiple Answer",
  paragraph: {
    text: [
      "Water covers more than 66% of the surface of earth. Nearly all of Earth's water is found in seas and other saltwater bodies, while most of the remaining freshwater is solidified in the form of snow cover.",
      "Waterways, lakes, wetlands and aquifers that contain easily accessible freshwater represent less than 1% of the world's water supply. But this valuable resource supports an enormous diversity of life, and is vital for human survival.",
      "The demand for water for a variety of different uses such as drinking, sanitation, farming, and energy production continues to increase as the worldwide population grows. In the meantime, human activities and environmental change are influencing changes in water cycles, putting freshwater ecosystems under strain. Pollution, construction and mining activities pose additional challenges.",
    ],
    answer: [
      {
        text: "Most of the Earth's water is solidified in the form of snow.",
        value: "0",
      },
      {
        text: "Over two thirds of the surface of the earth is covered with water",
        value: "1",
      },
      {
        text: "The demand for water has seen a steady decline over time.",
        value: "2",
      },
      {
        text: "Freshwater constitutes about 1% of the world's  water supply.",
        value: "3",
      },

      {
        text: "Human survival does not depend on water.",
        value: "4",
      },
    ],
    question: "Which of the following are true statements about water?",
  },
  isDone: false,
  answer: [],
  result: ["1", "3"],
  point: 0,
};

const multipleChoiceQuestionSlice = createSlice({
  name: "MultipleChoiceQuestion",
  initialState,
  reducers: {
    //   action to saga
    getAnswer(state, action) {
      state.isDone = true;
    },
    updateAnswer(state, action) {
      console.log(action.payload);
      const check = state.answer.find((value) => value === action.payload);
      check
        ? (state.answer = state.answer.filter(
            (value) => value !== action.payload
          ))
        : state.answer.push(action.payload);
      state.answer.sort();
    },
    clearData() {
      return initialState;
    },
  },
});

// action
export const multipleChoiceQuestionActions =
  multipleChoiceQuestionSlice.actions;

// selector
export const selectMultipleChoiceQuestionData = (state) =>
  state.multipleChoiceQuestion;

// reducer
export const multipleChoiceQuestionReducer =
  multipleChoiceQuestionSlice.reducer;
