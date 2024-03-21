import { useState, useEffect, useContext } from 'react';
import { GameContext } from '../context/GameContext';
import Board from '../games/gameMode1';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { useImage } from '../hooks/useImage';
import { useQuiz } from '../hooks/useQuiz';
import { useParams } from 'react-router-dom'

const PlayGame = () => {
    // global vars
    const {quiz, setQuiz} = useContext(GameContext)
    const { quizID } = useParams()

    // local vars
    const [imageUrls, setImageUrls] = useState(null)
    const [firstPlay, setFirstPlay] = useState(false)

    // hooks
    const {user} = useAuthContext()
    const {getAllImages} = useImage()
    const {getQuiz} = useQuiz()
    const {getLeaderboardByID, updateLeaderboard} = useLeaderboard()


    useEffect(() => {
        const fetchQuiz = async() => {
            if (quizID) {
                const quizJson = await getQuiz(quizID)
                setQuiz(quizJson)
            }
        }
        fetchQuiz()
    }, [])

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
                const leaderboard = await getLeaderboardByID(quiz.leaderboardID)
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

    // returns loading screen until database loaded
    if (!quiz._id) {
        return (
            <div className="App">
                <header className="Loading-header">
                Invalid Game ID 
                </header>
            </div>
            )
    } else if (!imageUrls || imageUrls.length === 0) {
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
            <label>Created by: {quiz.author}</label>
            <label>{quiz.description}</label>
            <Board quizName={quiz.quizName} imageUrls={imageUrls} submitScore={handleSubmitScore} firstPlay={firstPlay} setFirstPlay={setFirstPlay}/>
        </header>
    )
}

export default PlayGame