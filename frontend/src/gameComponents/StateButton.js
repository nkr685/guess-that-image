import { useEffect, useState } from "react";
import "../css/gameComponents/StateButton.css"

const StateButton = (props) => {
    // properties
    const { gameActive, setGameState} = props

    // local vars
    const [stateButtonText, setStateButtonText] = useState("PLAY GAME")

    // changes play button text
    useEffect (() => {
        if (gameActive) {
            setStateButtonText("RESET GAME");
        } else {
            setStateButtonText("PLAY GAME");
        }
    }, [gameActive]);

    return (
        <div>
            <button className="state-button" onClick={() => setGameState(!gameActive)}>{stateButtonText}</button>
        </div>
    )
}

export default StateButton