import { useState} from "react";

const InputBox = (props) => {
    // properties
    const { checkGuess, skipImage, gameActive} = props

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
        <form onSubmit={handleCheckGuess}>
            <input className="input-box" type="text" value={input} required onChange={(e) => setInput(e.target.value)} disabled={!gameActive}/>
            <input className="guess-button" type="submit" value=" GUESS " disabled={!gameActive}/> 
            <button className="skip-button" disabled={!gameActive} onClick={() => handleSkipImage()}>SKIP</button>
        </form>

    ); // use input for guess button so you can press enter too instead of just clicking
}

export default InputBox