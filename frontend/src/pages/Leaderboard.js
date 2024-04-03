import React, { useContext, useState, useEffect } from 'react';
import { useGet } from '../hooks/useGet';
import { GameContext } from '../context/GameContext';

const Leaderboard = () => {
    // global vars
    const { quiz, setQuiz } = useContext(GameContext)

    // hooks
    const { getAllLeaderboards} = useGet()

    // local vars
    const [leaderboards, setLeaderboards] = useState(null)
    const [leaderboard, setLeaderboard] = useState(null)

    // checks if quiz is in local storage if not in global var
    useEffect(() => {
        if (!quiz || Object.keys(quiz).length === 0) { // used for refreshes
            const str = sessionStorage.getItem('quiz')
            if (str) {
                const json = JSON.parse(str)
                setQuiz(json)            
            }
        }
        const fetchLeaderboards = async()=> {
            const json = await getAllLeaderboards()
            console.log(json)
            setLeaderboards(json)
            
        }
        fetchLeaderboards()
    }, [])    


    // returns loading screen until database loaded
    if (!leaderboards) {
        console.log(leaderboards)
        return (
            <div className="Loading-header">
                <header >
                    Loading Leaderboard
                </header>
            </div>
        );
    }

    const handleSelectChange = (e) => {
        const index = e.target.selectedIndex
        setLeaderboard(leaderboards[index])
    }
    return (
        <div className='Leaderboard'>
            <div>
                <select className="category-select" defaultValue={quiz.leaderboardID ? quiz.leaderboardID : -1} onChange={handleSelectChange}>
                    {!quiz.leaderboardID && (<option key={-1} >Select Quiz</option>)}
                    {leaderboards.map((_leaderboard, index) => (
                        <option key={_leaderboard._id} value={_leaderboard._id}>{_leaderboard.quizName}</option>
                    ))}
                </select>    
            </div>        
            <div>
                <table className="Leaderboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(leaderboard || !leaderboard)
                            ? (leaderboard || leaderboards.find(_leaderboard => _leaderboard._id === quiz.leaderboardID))
                                ? (leaderboard || leaderboards.find(_leaderboard => _leaderboard._id === quiz.leaderboardID)).scores
                                    .sort((a, b) => b.score - a.score) 
                                    .map((entry, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{entry.username}</td>
                                            <td>{entry.score}</td>
                                        </tr>
                                    ))
                                : null
                            : null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;