import StateButton from './gameMode1Components/StateButton';
import Timer from './gameMode1Components/Timer';
import ScoreBoard from './gameMode1Components/Scoreboard';
import ImageDisplay from './gameMode1Components/ImageDisplay';
import InputBox from './gameMode1Components/InputBox';
import { useEffect, useState } from 'react';

function Board(props) {
    // properties
    const {imageUrls, quizName, submitScore, firstPlay, setFirstPlay} = props

    // local vars
    const [tempImageUrls, setTempImageUrls] = useState(imageUrls)
    const [gameActive, setGameState] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const [imageName, setImageName] = useState("")
    const [score, setScore] = useState(0)
    const [correct, setCorrect] = useState(0)
    const [incorrect, setIncorrect] = useState(0)

    // constants
    const placeholderImageUrl = "https://upload.wikimedia.org/wikipedia/commons/2/25/Icon-round-Question_mark.jpg"
    const placeholderImageName = "Placeholder"
    const reward = 300;
    const penalty = 100;
    const height = 600
    const width = 1000;
    const hintLimit = 3;
    const startTime = 30
    
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
            setImageUrl(placeholderImageUrl)
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
        <div className='App-header' style={{ height: '90vh' }}>
            <StateButton gameActive={gameActive} setGameState={handleGameState}/>
            <ScoreBoard gameActive={gameActive} score={score} correct={correct} incorrect={incorrect} quizName={quizName} firstPlay={firstPlay}/>
            <Timer gameActive={gameActive} setGameState={handleGameState} startTime={startTime}/>
            <ImageDisplay gameActive={gameActive} imageName={imageName} imageUrl={imageUrl} height={height} width={width} limit={hintLimit}/>
            <InputBox gameActive={gameActive} checkGuess={handleGuessCheck} skipImage={handleSkipImage}/>    
        </div>
    );
}

export default Board;
