import { useContext, useState, useEffect } from "react";
import { GameContext } from "../../context/GameContext";

const ScoreBoard = () => {
    // global vars
    const { gameActive, score, correct, incorrect} = useContext(GameContext)

    // local vars
    const [ scoreResults, setScoreResults] = useState(`Score: ${score} | Correct: ${correct} | Incorrect: ${incorrect}`)

    // sets score display every time anytime score, correct, mistakes updates
    useEffect(() => {
        if (gameActive) {
            setScoreResults(`Score: ${score} | Correct: ${correct} | Incorrect: ${incorrect}`)
        } else {
            setScoreResults(`Final Score: ${score} | Correct: ${correct} | Incorrect: ${incorrect}`)
        }
    }, [gameActive, score, correct, incorrect]); // only rerenders when current time is updated

    return (
        <div>
            <div className="score">{scoreResults}</div>
        </div>
    )
}

export default ScoreBoard