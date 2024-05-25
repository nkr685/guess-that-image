import "../css/gameComponents/ScoreBoard.css"

const ScoreBoard = (props) => {
    // properties
    const { gameActive, score, correct, incorrect, firstPlay} = props

    return (
        <div>
            <div className="stats-row">
                <div className="stats-score">
                    {gameActive ? `Score: ${score}` : !firstPlay ? `Score: ${score}` : `Final Score: ${score}`}
                </div>
                <div className="stats-correct">
                    {`Correct Guesses: ${correct}/${correct+incorrect}`}
                </div>            
            </div>            
        </div>

    )
}

export default ScoreBoard