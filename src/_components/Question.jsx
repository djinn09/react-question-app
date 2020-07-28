import React, { useEffect, useState } from "react";
import axios from "axios";
import ApiInstance from "../api";

async function QuestionService(questionId) {
  try {
    const response = await ApiInstance.get(`/questions/${questionId}`);
    if (response.status === 200) {
      let responseData = response.data;
      return Promise.resolve(responseData);
    }
    return Promise.reject("Something went wrong");
  } catch (error) {
    // console.log(error);

    return Promise.reject("Something went wrong");
  }
}
const Question = (props) => {
  const [state, SetState] = useState({
    question: null,
    error: null,
  });
  const [isLoading, SetLoading] = useState(false);
  const loadData = async () => {
    SetLoading(true);
    const {
      match: { params },
      history,
    } = props;

    let questionId = params.questionId;
    // if (!questionId){

    //   return
    // }
    try {
      const ques = await QuestionService(questionId);
      SetState({ question: ques });
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
      SetState({ error: "Something Went Wrong...." });
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  console.log(state.question, "Questions");
  return (
    <div className="container">
      <div className="row">
        <div className="jumbotron col-12">
          <p>aisdisad</p>
          {/* <h1 className="display-3">{state.question.title}</h1>
          <p className="lead">{state.question.description}</p>
          <hr className="my-4" />
          <p>Answers:</p>
          {state.question.answers.map((answer, idx) => (
            <p className="lead" key={idx}>
              {answer.answer}
            </p>
          ))} */}
        </div>
      </div>
    </div>
  );
};
export default Question;
