import { useState, useEffect, useContext } from 'react';
import { GameContext } from '../context/GameContext';
import Board from '../components/Board';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { useSubmitScore } from '../hooks/useSubmitScore';

const PlayGame = () => {
    // global vars
    const {category, gameActive, played, score, setScore, togglePlayed} = useContext(GameContext)

    // local vars
    const [imageUrls, setImageUrls] = useState(null)
    const { user } = useAuthContext()
    const {getLeaderboard, setLeaderboard, leaderboard} = useLeaderboard()
    const {submitScore} = useSubmitScore()




    // GET IMAGES FROM DATABASE BEFORE RUNNING APP!!!!
    useEffect(() => {
        const fetchImageUrls = async()=> {
            const response = await fetch(`api/ImageUrls?category=${category}`) // http://localhost:4000 REMOVED AFTER ADDING PROXY
            const json = await response.json()
            if (response.ok) {
                setImageUrls(json)
            }
        }

        fetchImageUrls()
    }, [category, setImageUrls])

    useEffect(() => {
        if (!user) {
            setScore(0)
        }
        if (!gameActive && played && user && score > 0) {
            const check = async () => {
                const id = "65e552083290768bee57a9a9";
                await getLeaderboard(id)
            };
        
            check();
          }
    }, [gameActive])

    useEffect(() => {
        if (leaderboard && leaderboard.hasOwnProperty('_id')) {
            const check = async () => {
                const entry = {user: user.username, score}
                const existingUserIndex = leaderboard.scores.findIndex((score) => score.user === user.username)
                if (existingUserIndex === -1 || entry.score > leaderboard.scores[existingUserIndex].score) {
                    const scores = [...leaderboard.scores]
                    if (existingUserIndex !== -1) {
                      scores.splice(existingUserIndex, 1);
                    }                  
                    scores.push(entry)
                    const updatedLeaderboard = {...leaderboard,scores: scores}
                    await submitScore(updatedLeaderboard)
                    setLeaderboard(null)
                    setScore(0)
                    togglePlayed() //???
                  }
            };
        
            check();
          }
    }, [leaderboard])


    // returns loading screen until database loaded
    if (!imageUrls || imageUrls.length === 0) {
        return (
        <div className="App">
            <header className="Loading-header">
            Loading Game
            </header>
        </div>
        );
    }
    
    return (
        <header className="App-header">
            <Board imageUrls={imageUrls}/>
        </header>
    )
}

export default PlayGame