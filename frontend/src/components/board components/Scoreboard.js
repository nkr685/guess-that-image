import { useContext, useState, useEffect } from "react";
import { GameContext } from "../../context/GameContext";

const ScoreBoard = () => {
    // global vars
    const { gameActive, score, correct, incorrect, categoryName, played} = useContext(GameContext)

    // local vars
    const [scoreText, setScoreText] = useState(`0`)

    useEffect(() => {
        if (gameActive || (!gameActive && score > 0)) {
            setScoreText(`${score}`)
        }
    }, [score])

    return (
        <div className="quiz">
            {`Guess that: ${ categoryName.charAt(categoryName.length - 1) === 's' ? categoryName.slice(0, -1): categoryName}`}
            <div className="score">{gameActive ? `Score: ${scoreText}` : !played ? `Score: ${scoreText}` : `Final Score: ${scoreText}`}
                <div>
                    {`${correct}/${correct+incorrect}`}
                </div>
            </div>
        </div>
    )
}

export default ScoreBoard