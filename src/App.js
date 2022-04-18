import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { NotFound } from "./components/Common/";
import { Home } from "./components/Common/Home";
import { QuestionPage } from "./features/question/pages/questionPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/" element={<Home />}></Route>

        <Route path="/question/*" element={<QuestionPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
