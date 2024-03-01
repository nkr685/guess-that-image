import StateButton from '../components/StateButton';
import Timer from '../components/Timer';
import ScoreBoard from '../components/Scoreboard';
import ImageDisplay from '../components/ImageDisplay';
import InputBox from '../components/InputBox';
import CategorySelectBox from './CategorySelect';
import { useEffect } from 'react';
import { useContext } from 'react';
import { GameContext } from '../context/GameContext';

function Board({imageUrls}) {
    
    // global vars
    const   {     
            gameActive, score, correct, incorrect, imageName, guess, next,
            setScore, setCorrect, setIncorrect, setImageUrl, setImageName, setGuess, setNext
            } = useContext(GameContext)

    // local vars
    const reward = 300;
    const penalty = 100;

    // updates every time new game starts
    useEffect(() => { 
        if(gameActive) {
            setScore(0)
            setCorrect(0)
            setIncorrect(0)
        }
        NextImage()
    }, [gameActive])

    // updates on every guess
    useEffect(() => { 
        if(gameActive) {
            if (guess === '') {}  // setGuess in this useEffect calls useEffect again
            else if (guess.toLowerCase() === imageName.toLowerCase()) {
                setScore(score+reward)
                setCorrect(correct+1)
                NextImage()
            }
            else {
                setScore(score-penalty)
                setIncorrect(incorrect+1)
            }
        }
        setGuess('')
    }, [guess])

    // used for skip button
    useEffect(() => {  
        if(next) {
            setNext(false)
            setScore(score-penalty*3)
            setIncorrect(incorrect+1)
            NextImage()
        }
        setGuess('') 
    }, [next])

    // gets next image from imageUrls
    const NextImage = () => { 
        if (gameActive) {
            const randomIndex = Math.floor(Math.random() * imageUrls.length);
            const image = imageUrls.splice(randomIndex, 1)[0]
            setImageUrl(image["url"])
            setImageName(image["name"])
        }
        else {
            setImageUrl("https://upload.wikimedia.org/wikipedia/commons/2/25/Icon-round-Question_mark.jpg")
            setImageName("Placeholder")
        }

    }

    return (
        <div className='App-header'>
            <div className='title' >GUESS THAT IMAGE</div>
            <CategorySelectBox/>
            <Timer/>
            <StateButton/>
            <ImageDisplay/>
            <ScoreBoard/>
            <InputBox/>    
        </div>
    );
}

export default Board;
