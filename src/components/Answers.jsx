import { useRef } from "react";


function Answers({ answers, selectedAnswer, answersState, onSelect }) {
    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        < ul id="answers" >
            {
                shuffledAnswers.current.map((answer) => {

                    const isSelected = selectedAnswer === answer

                    let cssClasses = ''

                    if (answersState === 'answered' && isSelected) {
                        cssClasses = 'selected'
                    }

                    if ((answersState === 'correct' || answersState === 'wrong') && isSelected) {
                        cssClasses = answersState
                    }



                    return <li key={answer} className="answer">
                        <button onClick={() => onSelect(answer)}
                            className={cssClasses}
                            disabled={answersState !== ''}
                        >{answer}</button>
                    </li>
                }
                )
            }
        </ul >
    )
}



export default Answers;
