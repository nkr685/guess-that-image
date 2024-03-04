import { useContext, useState, useEffect } from "react";
import { GameContext } from "../../context/GameContext";

const ScoreBoard = () => {
    // global vars
    const { gameActive, score, correct, incorrect, categoryName} = useContext(GameContext)

    return (
        <div className="quiz">
            {`Guess that: ${ categoryName.charAt(categoryName.length - 1) === 's' ? categoryName.slice(0, -1): categoryName}`}
            <div className="score">{gameActive ? `Score: ${score}` : `Final Score: ${score}`}
                <div>
                    {`${correct}/${correct+incorrect}`}
                </div>
            </div>
        </div>
    )
}

export default ScoreBoard