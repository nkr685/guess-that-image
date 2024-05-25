import { useState, useEffect, useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useGet } from '../hooks/useGet';
import { useSend } from '../hooks/useSend';
import { useParams, useLocation } from 'react-router-dom'
import StateButton from '../gameComponents/StateButton';
import Timer from '../gameComponents/Timer';
import ScoreBoard from '../gameComponents/Scoreboard';
import ImageDisplay from '../gameComponents/ImageDisplay';
import InputBox from '../gameComponents/InputBox';
import Rating from '../gameComponents/Rating';
import Popup from '../gameComponents/Popup';
import "../css/pages/PlayGame.css"
import StackedImageDisplay from '../gameComponents/StackedImageDisplay';

const PlayGame = () => {
    // hooks
    const { user } = useAuthContext()
    const { getAllImages, getQuiz, getRandomQuiz, getLeaderboard, getUser } = useGet()
    const { updateLeaderboard, updateQuiz } = useSend()

    // global vars
    const { pathname } = useLocation()
    const {quiz, setQuiz} = useContext(GameContext)
    const { quizID } = useParams()

    // local vars
    const [imageUrls, setImageUrls] = useState(null)
    const [firstPlay, setFirstPlay] = useState(false)
    const [author, setAuthor] = useState(null)
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
        reward = parseInt(quiz.params.reward, 10)
        penalty = parseInt(quiz.params.penalty, 10)
        hintLimit = parseInt(quiz.params.hintLimit, 10)
        startTime = parseInt(quiz.params.startTime, 10)
    }



    useEffect(() => {
        const fetchQuiz = async() => {
            if (quizID) {
                console.log(quizID)
                const quizJson = await getQuiz(quizID)
                setQuiz(quizJson)
            } else {
                const quizJson = await getRandomQuiz(quizID)
                setQuiz(quizJson[0])
            }
        }
        fetchQuiz()
    }, [])

    useEffect(() => {
        const fetchAuthor = async(authorID) => {
            const authorJson = await getUser(authorID)
            setAuthor(authorJson)
        }
        if (quiz.author) {
            fetchAuthor(quiz.author)
        }
    }, [quiz])

    // gets images when first rendering
    useEffect(() => {
        const fetchImageUrls = async()=> {
            if (quiz) {
                const imageJson = await getAllImages(quiz._id)
                setImageUrls(imageJson)                
            }
        }
        fetchImageUrls()
    }, [quiz])


    const handleSubmitScore = (score) => {
        if (user && firstPlay) {
            const submitScore = async () => {
                const leaderboard = await getLeaderboard(quiz.leaderboardID)
                if (leaderboard) {
                    const entry = {_id: user._id, username: user.username, score, deleted: user.deleted}
                    const existingUserIndex = leaderboard.scores.findIndex((score) => score.username === user.username) // finds previous user entry if exists
                    if (existingUserIndex === -1 || entry.score > leaderboard.scores[existingUserIndex].score) { // runs only if user entry doesnt exist or cur is higher than prev
                        const scores = [...leaderboard.scores]
                        if (existingUserIndex !== -1) { // removes previous user score if exists
                            scores.splice(existingUserIndex, 1);
                        }     
                        scores.push(entry)
                        const newLeaderboard = {...leaderboard,scores: scores}
                        await updateLeaderboard(newLeaderboard)
                    }                    
                }
            }
            submitScore()
        }
    }

    const handleSubmitRating = (score) => {
        if (user) {
            const submitRating = async () => {
                const newQuiz = {...quiz}
                if (!newQuiz.hasOwnProperty('ratings')){
                    newQuiz['ratings'] = {}
                }
                newQuiz['ratings'][user._id] = score
                await updateQuiz(newQuiz)
            }
            submitRating()
        }
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
            handleSubmitScore(score)
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

    // returns loading screen until database loaded
    if (!quiz._id) {
        return (
            <div>
                <header className="Loading-header">
                Invalid Game ID 
                </header>
            </div>
            )
    } else if (!quiz || !imageUrls || imageUrls.length === 0 || !author) { // needs time to grab data from database
        return (
            <div>
                <header className="Loading-header">
                Loading Game
                </header>
            </div>
        )
    } else 
    return (
        <div>
            <label>Created by: {author.username}</label>
            {/* <button onClick={()=>{alert("Link Copied!"); navigator.clipboard.writeText("http://localhost:3000"+pathname)}}>Share!</button> */}
            {/* <Popup></Popup> */}
            <label>{quiz.description}</label>
            {/* <Rating user={user} ratings={quiz.ratings} userRating={user ? quiz.ratings[user._id] : 0} submitRating={handleSubmitRating}/> */}
            {/* <StateButton gameActive={gameActive} setGameState={handleGameState}/> */}
            <ScoreBoard gameActive={gameActive} score={score} correct={correct} incorrect={incorrect} quizName={quiz.quizName} firstPlay={firstPlay}/>
            <Timer gameActive={gameActive} setGameState={handleGameState} startTime={startTime}/>
            {(quiz.gameMode === "pokemon") ?
                <StackedImageDisplay gameActive={gameActive} imageName={imageName} imageUrl={imageUrl} height={height} width={width} limit={hintLimit}/>
                :
                <ImageDisplay gameActive={gameActive} imageName={imageName} imageUrl={imageUrl} height={height} width={width} limit={hintLimit}/>
            }
            <InputBox gameActive={gameActive} checkGuess={handleGuessCheck} skipImage={handleSkipImage}/>    
        </div>

    )
}

export default PlayGame