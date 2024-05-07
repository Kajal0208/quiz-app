import { useState, useCallback } from "react";
import QUESTIONS from '../questions'
import quizCompletedImg from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer";

function Quiz() {

    const [answerState, setAnswerState] = useState('')
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizCompleted = activeQuestionIndex === QUESTIONS.length;



    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        });

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct')
            } else {
                setAnswerState('wrong')
            }

            setTimeout(()=>{
                setAnswerState('');
            },2000)

        }, 1000)

    }, [activeQuestionIndex])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizCompleted) {
        return (
            <div id='summary'>
                <img src={quizCompletedImg} alt='Trophy icon' />
                <h2>Quiz Completed!</h2>
            </div>
        )
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex]?.answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer
                    key={activeQuestionIndex}
                    timeout={10000}
                    onTimeout={handleSkipAnswer}
                />
                <h2>{QUESTIONS[activeQuestionIndex]?.text}</h2>
                <ul id="answers">
                    {QUESTIONS[activeQuestionIndex]?.answers.map((answer) => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}
                            
                            >{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Quiz