import StateButton from './components/StateButton';
import Timer from './components/Timer';
import ScoreBoard from './components/Scoreboard';
import StackedImageDisplay from './components/StackedImageDisplay';
import InputBox from './components/InputBox';
import { useEffect, useState } from 'react';

function PokemonBoard(props) {
    // properties
    const { quiz, imageUrls, quizName, submitScore, firstPlay, setFirstPlay} = props

    // local vars
    const [tempImageUrls, setTempImageUrls] = useState(imageUrls)
    const [gameActive, setGameState] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const [imageName, setImageName] = useState("")
    const [score, setScore] = useState(0)
    const [correct, setCorrect] = useState(0)
    const [incorrect, setIncorrect] = useState(0)
    // constants
    const height = 600
    const width = 1000;
    const placeholderImageUrl = "https://upload.wikimedia.org/wikipedia/commons/2/25/Icon-round-Question_mark.jpg"
    const placeholderImageName = "Placeholder"
    var reward = 300;
    var penalty = 100;
    var hintLimit = 3;
    var startTime = 30
    if (Object.prototype.hasOwnProperty.call(quiz, "params")) {
        reward = parseInt(quiz.params.reward,10)
        penalty = parseInt(quiz.params.penalty, 10)
        hintLimit = parseInt(quiz.params.hintLimit, 10)
        startTime = parseInt(quiz.params.startTime, 10)
    }
    // updates every time new game starts
    useEffect(() => { 
        NextImage()
        if(gameActive) {
            if (!firstPlay) {
                setFirstPlay(true)
            }
            setScore(0)
            setCorrect(0)
            setIncorrect(0)
        } else {
            submitScore(score)
        }
    }, [gameActive])

    // gets next image from imageUrls
    const NextImage = () => { 
        if (gameActive) {
            const randomIndex = Math.floor(Math.random() * tempImageUrls.length);
            const image = tempImageUrls.splice(randomIndex, 1)[0]
            if (image) {
            setImageUrl(image.imageUrl)
            setImageName(image.imageName)                
            } else {
                handleGameState(false)
            }
        }
        else {
            setImageUrl("")
            setImageName(placeholderImageName)
        }

    }

    // starts/stops game from StateButton press or Timer end
    const handleGameState = (state) => {
        setGameState(state)
        setTempImageUrls(imageUrls.slice()) //  
    }

    // handles guess on InputBox component
    const handleGuessCheck = (guess) => {
        if (imageName.toLowerCase().indexOf(guess.toLowerCase()) !== -1 && guess.length >= 3) {
            setScore(score+reward)
            setCorrect(correct+1)
            NextImage()
        }
        else {
            setScore(score-penalty)
            setIncorrect(incorrect+1)
        }
    }

    // handles skipping on InputBox component
    const handleSkipImage = () => {
        NextImage()
        setScore(score-penalty)
        setIncorrect(incorrect+1)
    }

    return (
        <div style={{ height: '80vh' }}>
            <StateButton gameActive={gameActive} setGameState={handleGameState}/>
            <ScoreBoard gameActive={gameActive} score={score} correct={correct} incorrect={incorrect} quizName={quizName} firstPlay={firstPlay}/>
            <Timer gameActive={gameActive} setGameState={handleGameState} startTime={startTime}/>
            <StackedImageDisplay gameActive={gameActive} imageName={imageName} imageUrl={imageUrl} height={height} width={width} limit={hintLimit}/>
            <InputBox gameActive={gameActive} checkGuess={handleGuessCheck} skipImage={handleSkipImage}/>    
        </div>
    );
}

export default PokemonBoard;
