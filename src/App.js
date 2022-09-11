import "./App.css";
import { useState, useEffect } from "react";
import Results from "./Results";
import Question from "./Question";
import Loading from "./Loading";

function App() {
	const [data, setData] = useState([]);
	const [correctAnswers, setCorrectAnswers] = useState(0);
	const [loading, setLoading] = useState(true);
	const [isResults, setIsResults] = useState(false);
	const [question, setQuestion] = useState({});

	function createNewQuestion() {
		function randomBetween(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		function getRandomIndexList() {
			const list = new Set();
			while (list.size !== 4) {
				list.add(randomBetween(0, data.length));
			}
			return [...list];
		}

		function createCapitalQuestion() {
			const list = getRandomIndexList();
			const newQuestion = {
				type: "capital",
				answers: [],
			};
			const correctIndex = randomBetween(0, 3);
			newQuestion.capital = data[list[correctIndex]].capital;
			newQuestion.answers = list.map((item, i) => {
				return { option: data[item].name, correct: correctIndex === i };
			});
			console.log(newQuestion);
			return newQuestion;
		}

		function createFlagQuestion() {
			const list = getRandomIndexList();
			const newQuestion = {
				type: "flag",
				answers: [],
			};
			const correctIndex = randomBetween(0, 3);
			newQuestion.flag = data[list[correctIndex]].flag;
			newQuestion.answers = list.map((item, i) => {
				return { option: data[item].name, correct: correctIndex === i };
			});
			console.log(newQuestion);
			return newQuestion;
		}

		if (Math.random() < 0.5) return createCapitalQuestion(data);
		return createFlagQuestion(data);
	}

	function nextQuestion(isCorrect) {
		if (isCorrect) {
			setCorrectAnswers((curr) => curr + 1);
			setQuestion(createNewQuestion());
		} else {
			setIsResults(true);
		}
	}

	function reset() {
		setCorrectAnswers(0);
		setQuestion(createNewQuestion());
		setIsResults(false);
	}

	useEffect(() => {
		async function getData() {
			function createNewQuestion() {
				function randomBetween(min, max) {
					return Math.floor(Math.random() * (max - min + 1)) + min;
				}

				function getRandomIndexList() {
					const list = new Set();
					while (list.size !== 4) {
						list.add(randomBetween(0, data.length));
					}
					return [...list];
				}

				function createCapitalQuestion() {
					const list = getRandomIndexList();
					const newQuestion = {
						type: "capital",
						answers: [],
					};
					const correctIndex = randomBetween(0, 3);
					newQuestion.capital = data[list[correctIndex]].capital;
					newQuestion.answers = list.map((item, i) => {
						return { option: data[item].name, correct: correctIndex === i };
					});
					console.log(newQuestion);
					return newQuestion;
				}

				function createFlagQuestion() {
					const list = getRandomIndexList();
					const newQuestion = {
						type: "flag",
						answers: [],
					};
					const correctIndex = randomBetween(0, 3);
					newQuestion.flag = data[list[correctIndex]].flag;
					newQuestion.answers = list.map((item, i) => {
						return { option: data[item].name, correct: correctIndex === i };
					});
					console.log(newQuestion);
					return newQuestion;
				}

				if (Math.random() < 0.5) return createCapitalQuestion(data);
				return createFlagQuestion(data);
			}

			const options = { method: "GET" };

			const response = await fetch("https://restcountries.com/v3.1/all", options);
			const jsonData = await response.json();
			const data = jsonData.map((country) => {
				const name = country.name.common;
				const flag = country.flags.png;
				const capital = country.capital ? country.capital[0] : null;

				return {
					name,
					flag,
					capital,
				};
			});
			setData(data);
			setQuestion(createNewQuestion());
			setLoading(false);
		}

		getData();
	}, []);

	return (
		<div className="App">
			<div className="container">
				{loading ? (
					<Loading />
				) : (
					<>
						<h1 className="title">COUNTRY QUIZ</h1>
						<div className="card">
							{isResults ? (
								<Results correctAnswers={correctAnswers} reset={reset} />
							) : (
								<Question question={question} nextQuestion={nextQuestion} />
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default App;
