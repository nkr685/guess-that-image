import { createContext, useState } from "react";


export const GameContext = createContext();

// all global variables/functions declared/instatiated here
const GameContextProvider = (props) => {
    const [gameActive, _setGameState] = useState(false);
    const [score, _setScore] = useState(0);
    const [correct, _setCorrect] = useState(0);
    const [incorrect, _setIncorrect] = useState(0);
    const [imageUrl, _setImageUrl] = useState("");
    const [imageName, _setImageName] = useState("")
    const [guess, _setGuess] = useState("");
    const [next, _setNext] = useState(false)
    const [category, _setCategory] = useState("")
    const [categoryName, _setCategoryName] = useState("")
    const [played, _setPlayed] = useState(false)

    
    const toggleGameState = () => {
        _setGameState(!gameActive)
    }

    const setScore = (points) => {
        _setScore(points)
    }

    const setCorrect = (count) => {
        _setCorrect(count)
    }

    const setIncorrect = (count) => {
        _setIncorrect(count)
    }

    const setImageUrl = (url) => {
        _setImageUrl(url)
    }

    const setImageName = (name) => {
        _setImageName(name)
    }

    const setGuess = (input) => {
        _setGuess(input)
    }

    const setNext = (bool) => {
        _setNext(bool)
    }

    const setCategory = (category) => {
        _setCategory(category)
    }

    const setCategoryName = (categoryName) => {
        _setCategoryName(categoryName)
    }

    const togglePlayed = () => {
        _setPlayed(!played)
    }


    return (
        <GameContext.Provider value={{
                    gameActive, score, correct, incorrect, imageUrl, imageName, guess, next, category, categoryName, played,
                    toggleGameState, setScore, setCorrect, setIncorrect, setImageUrl, setImageName, setGuess, setNext, setCategory, setCategoryName, togglePlayed
            }}>
            {props.children}
        </GameContext.Provider>
    );
}

export default GameContextProvider