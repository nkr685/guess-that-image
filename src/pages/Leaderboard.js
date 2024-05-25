import React, { useContext, useState, useEffect } from 'react';
import { useGet } from '../hooks/useGet';
import { GameContext } from '../context/GameContext';
import { Link } from 'react-router-dom'
import "../css/pages/Leaderboard.css"


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
            setLeaderboards(json)
            if(json) {
                setLeaderboard(json[0])
            }
        }
        fetchLeaderboards()
    }, [])    


    // returns loading screen until database loaded
    if (!leaderboards) {
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
        <div className='leaderboard'>
            <div>
                {/* <select className="category-select" defaultValue={quiz.leaderboardID ? quiz.leaderboardID : -1} onChange={handleSelectChange}>
                    <option key='1'>Scores</option>
                    <option key='2'>Users</option>
                </select>     */}
                <select className="leaderboard-select" defaultValue={quiz.leaderboardID ? quiz.leaderboardID : leaderboard._id} onChange={handleSelectChange}>
                    {leaderboards.map((_leaderboard, index) => (
                        <option key={_leaderboard._id} value={_leaderboard._id}>{_leaderboard.quizName}</option>
                    ))}
                </select>    
            </div>        
            <div>
                <table className="leaderboard-table">
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
                                            <td>
                                                {entry.username}
                                                {/* {entry.username &&
                                                <Link className="entry-link" to={`/profile/${entry._id}`}>
                                                    {entry.username}
                                                </Link>                                                           
                                                } */}
                                            </td>
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