import { useState, useEffect, useContext } from 'react';
import { GameContext } from '../context/GameContext';
import Board from '../games/gameMode1';
import { useAuthContext } from '../hooks/useAuthContext';
import { useGet } from '../hooks/useGet';
import { useSend } from '../hooks/useSend';
import { useParams, useLocation } from 'react-router-dom'
import Rating from '../components/Rating';

const PlayGame = () => {
    // hooks
    const { user } = useAuthContext()
    const { getAllImages, getQuiz, getLeaderboard, getUser } = useGet()
    const { updateLeaderboard, updateQuiz } = useSend()

    // global vars
    const { pathname } = useLocation()
    const {quiz, setQuiz} = useContext(GameContext)
    const { quizID } = useParams()

    // local vars
    const [imageUrls, setImageUrls] = useState(null)
    const [firstPlay, setFirstPlay] = useState(false)
    const [author, setAuthor] = useState(null)


    useEffect(() => {
        const fetchQuiz = async() => {
            if (quizID) {
                const quizJson = await getQuiz(quizID)
                setQuiz(quizJson)
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
            console.log(quiz)
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
                    const entry = {username: user.username, score}
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

    // returns loading screen until database loaded
    if (!quiz._id) {
        return (
            <div className="App">
                <header className="Loading-header">
                Invalid Game ID 
                </header>
            </div>
            )
    } else if (!imageUrls || imageUrls.length === 0 || !author) { // needs time to grab data from database
        return (
        <div className="App">
            <header className="Loading-header">
            Loading Game
            </header>
        </div>
        )
    } else 
    
    return (
        <header className="App-header">
            <label>Created by: {author.username}</label>
            <button onClick={()=>{alert("Link Copied!"); navigator.clipboard.writeText("http://localhost:3000"+pathname)}}>Share!</button>
            <label>{quiz.description}</label>
            {/* <Rating userRating={user ? quiz.ratings[user._id] : 0} submitRating={handleSubmitRating}/> */}
            <Board quiz={quiz} quizName={quiz.quizName} imageUrls={imageUrls} submitScore={handleSubmitScore} firstPlay={firstPlay} setFirstPlay={setFirstPlay}/>
        </header>
    )
}

export default PlayGame