import React, { useEffect, useState } from "react";
import axios from "axios";
const Question = (props) => {
  const [question, SetQuestion] = useState(null);
  const loadData = async () => {
    const {
      match: { params },
    } = props;
    const question = (
      await axios.get(`http://localhost:8081/${params.questionId}`)
    ).data;
    SetQuestion(question);
  };
  useEffect(() => {
    loadData();
  }, []);
  return !question ? (
    <p>Loading...</p>
  ) : (
    <div className="container">
      <div className="row">
        <div className="jumbotron col-12">
          <h1 className="display-3">{question.title}</h1>
          <p className="lead">{question.description}</p>
          <hr className="my-4" />
          <p>Answers:</p>
          {question.answers.map((answer, idx) => (
            <p className="lead" key={idx}>
              {answer.answer}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Question;
