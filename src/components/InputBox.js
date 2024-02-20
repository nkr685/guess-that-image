import { useContext, useEffect, useState} from "react";
import { GameContext } from "../context/GameContext";


const InputBox = () => {

    // global vars
    const { gameActive, setGuess, next, setNext } = useContext(GameContext)

    // local vars
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent default action of form from refreshing the page
        setGuess(input)
        setInput('')
    }

    // clears input when next image loads
    useEffect(() => {
        if (next || gameActive) {
            setInput('')
        }
    }, [next, gameActive])

    return (
        <form onSubmit={handleSubmit}>
            <input className="input-box" type="text" value={input} required onChange={(e) => setInput(e.target.value)} disabled={!gameActive}/>
            <input className="guess-button" type="submit" value=" GUESS " disabled={!gameActive}/> 
            <button className="skip-button" disabled={!gameActive} onClick={() => setNext(true)}>SKIP</button>
        </form>

    ); // use input for guess button so you can press enter too instead of just clicking
}

export default InputBox