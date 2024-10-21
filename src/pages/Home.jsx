import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [number, setNumber] = useState("");
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("any");
  const [type, setType] = useState("any");
  const [questions, setQuestions] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);

  const selectCategory = [
    { name: "Any Category", label: "Any Category", value: "any" },
    { name: "General Knowledge", label: "General Knowledge", value: "9" },
    { name: "Entertainment: Books", label: "Entertainment: Books", value: "10" },
    { name: "Entertainment: Film", label: "Entertainment: Film", value: "11" },
  ];

  const selectDifficulty = [
    { name: "Any Difficulty", label: "Any Difficulty", value: "any" },
    { name: "Easy", label: "Easy", value: "easy" },
    { name: "Medium", label: "Medium", value: "medium" },
    { name: "Hard", label: "Hard", value: "hard" },
  ];

  const selectType = [
    { name: "Any Type", label: "Any Type", value: "any" },
    { name: "Multiple Choice", label: "Multiple Choice", value: "multiple" },
    { name: "True/False", label: "True/False", value: "boolean" },
  ];

  const fetchQuestions = async () => {
    // let url = https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=${type}
    let url = `https://opentdb.com/api.php?amount=${number}`;
    if (category !== "any") `url += &category=${category}`;
    if (difficulty !== "any") `url += &difficulty=${difficulty}`;
    if (type !== "any") `url += &type=${type}`;
    console.log(url);

    try {
      const response = await axios.get(url);
      setQuestions(response.data.results);
      setShowQuiz(true);
    } catch (error) {
      console.error("Error fetching questions", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchQuestions();
  };

  return (
    <div>
      {!showQuiz ? (
        <div id="first_screen">
          <h1>Quiz API</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="number"
              placeholder="Enter number of questions"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />

            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {selectCategory.map((cat, index) => (
                <option key={index} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              {selectDifficulty.map((diff, index) => (
                <option key={index} value={diff.value}>
                  {diff.label}
                </option>
              ))}
            </select>

            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {selectType.map((type, index) => (
                <option key={index} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            <button type="submit">Fetch Questions</button>
          </form>
        </div>
      ) : (
        <div id="last_screen">
          <h1>Quiz Questions</h1>
          {questions.map((question, index) => (
            <div key={index}>
              <h3>{question.question}</h3>
              <ul>
                {[...question.incorrect_answers, question.correct_answer].map(
                  (answer, i) => (
                    <li key={i}>{answer}</li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;