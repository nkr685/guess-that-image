const ScoreBoard = (props) => {
    // properties
    const { gameActive, score, correct, incorrect, quizName, firstPlay} = props

    return (
        <div className="quiz">
            {`Guess that: ${ quizName.charAt(quizName.length - 1) === 's' ? quizName.slice(0, -1): quizName}`}
            <div className="score">{gameActive ? `Score: ${score}` : !firstPlay ? `Score: ${score}` : `Final Score: ${score}`}
                <div>
                    {`${correct}/${correct+incorrect}`}
                </div>
            </div>
        </div>
    )
}

export default ScoreBoard