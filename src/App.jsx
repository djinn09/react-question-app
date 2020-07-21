import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import NavBar from "./_components/NavBar";
import Questions from "./_components/Questions";
import Question from "./_components/Question";
// import { useAppState } from "./context";

function App() {
  // const { appState } = useAppState();
  return (
    <div className="App">
      <div className="container">
        <div className="col-sm-8 col-sm-offset-2">
          {/* <Login /> */}
          <div>
            <NavBar />
            <Route exact path="/" component={Questions} />
            <Route exact path="/question/:questionId" component={Question} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
