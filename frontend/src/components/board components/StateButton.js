import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../context/GameContext";

const StateButton = () => {
    // global vars
    const { gameActive, toggleGameState } = useContext(GameContext)

    // local vars
    const [stateButtonText, setStateButtonText] = useState("PLAY GAME")
    const handleStateClick = () => {
        toggleGameState()
    }

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
            <button className="state-button" onClick={() => handleStateClick()}>{stateButtonText}</button>
        </div>
    )
}

export default StateButton