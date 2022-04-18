import * as React from "react";
import { Route, Routes } from "react-router-dom";

import { NotFound } from "../../../components/Common";
import { Header } from "../../../components/Layout/Header";
import {
  FillQuestion,
  MultipleChoiceQuestion,
  ReOrderQuestion,
  DragQuestion,
  SingleChoiceQuestion,
} from "../../../components/Questions/";
import { Timer } from "../../../components/Timer";
import { ResultPage } from "./resultPage";

export function QuestionPage() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<NotFound />}></Route>
        <Route
          path="/1"
          element={
            <>
              <Timer />
              <FillQuestion />
            </>
          }
        ></Route>
        <Route
          path="/2"
          element={
            <>
              <Timer />
              <MultipleChoiceQuestion />
            </>
          }
        ></Route>
        <Route
          path="/3"
          element={
            <>
              <Timer />
              <ReOrderQuestion />
            </>
          }
        ></Route>
        <Route
          path="/4"
          element={
            <>
              <Timer />
              <DragQuestion />
            </>
          }
        ></Route>
        <Route
          path="/5"
          element={
            <>
              <Timer />
              <SingleChoiceQuestion />
            </>
          }
        ></Route>
        <Route path="/result" element={<ResultPage />}></Route>
      </Routes>
    </div>
  );
}
