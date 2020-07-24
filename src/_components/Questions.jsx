import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiInstance from "../api";

async function QuestionService() {
  try {
    const response = await ApiInstance.get("/questions");
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

const Questions = (props) => {
  const [state, SetState] = useState({
    questions: null,
    error: null,
  });
  const [isLoading, SetLoading] = useState(true);

  const loadData = async () => {
    try {
      const ques = await QuestionService();
      SetState({ questions: ques });
      SetLoading(false);
    } catch (error) {
      console.log(error);
      SetState({ error: "Something Went Wrong...." });
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="container">
      <div className="row">
        {state.error ? (
          <h1>{state.error}</h1>
        ) : state.questions && state.questions !== null && !isLoading ? (
          state.questions.map((question) => (
            <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
              <Link to={`/question/${question.id}`}>
                <div className="card text-white bg-success mb-3">
                  <div className="card-header">Answers: {question.answers}</div>
                  <div className="card-body">
                    <h4 className="card-title">{question.title}</h4>
                    <p className="card-text">{question.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
    </div>
  );
};
export default Questions;
