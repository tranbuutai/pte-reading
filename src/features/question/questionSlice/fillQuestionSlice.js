import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 1,
  type: "Fill in the Blanks(Reading & Writing)",
  title: "Reading & Writing: Fill in the Blanks",
  paragraph: [
    {
      key: 1,
      text: "While it’s no wonder that dogs are ",
      answer: {
        a: "boring",
        b: "popular",
        c: "danger",
        d: "laziness",
      },
    },
    {
      key: 2,
      text: " as man’s best friends, little is known about the origins of this friendship. It is presumed that dogs were one of the first animals to be ",
      answer: {
        a: "encounter",
        b: "ridicule",
        c: "safe",
        d: "domesticated",
      },
    },
    {
      key: 3,
      text: " by humans. One notable effect of this long relationship with humans is that unlike other canine species, dogs can ",
      answer: {
        a: "master",
        b: "flourish",
        c: "worried",
        d: "prejudice",
      },
    },
    {
      key: 4,
      text: " on a carbohydrate-rich diet. Historically, dogs have been helping us in many ways, but recently they are also assisting people with disabilities and ",
      answer: {
        a: "aiding",
        b: "mercurial",
        c: "tremendous",
        d: "carnivore",
      },
    },
    {
      key: 5,
      text: " in therapy. Patients who were administered dog therapy demonstrated decreased stress, increased happiness, and ",
      answer: {
        a: "jostle",
        b: "kind",
        c: "improved",
        d: "neighbourly",
      },
    },
    {
      key: 6,
      text: " energy levels.",
      answer: null,
    },
  ],
  isDone: false,
  answer: [],
  result: ["popular", "domesticated", "flourish", "aiding", "improved"],
  point: 0,
};

const fillQuestionSlice = createSlice({
  name: "FillQuestion",
  initialState,
  reducers: {
    //   action to saga

    getAnswer(state, action) {
      state.answer = action.payload.answer;
      state.isDone = true;
    },
    clearData() {
      return initialState;
    },
  },
});

// action
export const fillQuestionActions = fillQuestionSlice.actions;

// selector
export const selectFillQuestionData = (state) => state.fillQuestion;

// reducer
export const fillQuestionReducer = fillQuestionSlice.reducer;
