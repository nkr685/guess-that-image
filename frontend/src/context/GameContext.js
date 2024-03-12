import { createContext, useState } from "react";


export const GameContext = createContext();

// all global variables/functions declared/instatiated here
const GameContextProvider = (props) => {
    const [gameActive, _setGameState] = useState(false);
    const [quiz, _setQuiz] = useState({})

    
    const setGameState = (state) => {
        _setGameState(state)
    }

    const setQuiz = (quiz) => {
        _setQuiz(quiz)
    }



    return (
        <GameContext.Provider value={{
                    gameActive, quiz,
                    setGameState, setQuiz
            }}>
            {props.children}
        </GameContext.Provider>
    );
}

export default GameContextProvider