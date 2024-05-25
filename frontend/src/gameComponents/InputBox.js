import { useState} from "react";
import "../css/gameComponents/InputBox.css"

const InputBox = (props) => {
    // properties
    const { checkGuess, skipImage, gameActive, count, limit, handleHint} = props

    // local vars
    const [input, setInput] = useState('');

    // runs when pressing enter on keyboard
    const handleCheckGuess = (e) => {
        e.preventDefault(); // prevent default action of form from refreshing the page
        checkGuess(input)
        setInput('')
    }

    // skips image
    const handleSkipImage = () => {
        skipImage()
        setInput('')
    }

    return (
        <form className="inputs-container" onSubmit={handleCheckGuess}>
            <input className="input-box" type="text" placeholder="Enter Guess" value={input} required onChange={(e) => setInput(e.target.value)} disabled={!gameActive}/>
            <input className="guess-button" type="submit" value="SUBMIT" disabled={!gameActive}/> 
            <button className="hint-button" onClick={handleHint} disabled={!gameActive}>{(count < limit) ? `HINT ${count}/${limit}`: `HINT ${limit}/${limit}` }</button>
            <button className="skip-button" disabled={!gameActive} onClick={() => handleSkipImage()}>SKIP</button>
        </form>

    ); // use input for guess button so you can press enter too instead of just clicking
}

export default InputBox