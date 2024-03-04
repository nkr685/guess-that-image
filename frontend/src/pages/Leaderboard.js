import React, { useState, useEffect } from 'react';

const Leaderboard = () => {

    // local vars
    const [leaderboardID, setLeaderboardID] = useState("")
    const [leaderboard, setLeaderboard] = useState(null)
    
    const [leaderboards, setLeaderboards] = useState(null)
    useEffect(() => {
      const fetchLeaderboards = async()=> {
          const response = await fetch(`api/Leaderboard/`) // http://localhost:4000 REMOVED AFTER ADDING PROXY
          const json = await response.json()
          if (response.ok) {
              setLeaderboards(json)
          }
      }
      fetchLeaderboards()
  }, [leaderboards])

  useEffect(() => {
    const fetchLeaderboard = async()=> {
        const response = await fetch(`api/Leaderboard/${leaderboardID}`) // http://localhost:4000 REMOVED AFTER ADDING PROXY
        const json = await response.json()
        if (response.ok) {
            setLeaderboard(json)
        }
    }
    fetchLeaderboard()
}, [leaderboardID])

    // returns loading screen until database loaded
    if (!leaderboards || leaderboards.length === 0) {
      return (
      <div className="Loading-header">
          <header >
            Loading Leaderboard
          </header>
      </div>
      );
    }



  const handleSelectChange = (e) => {
    setLeaderboardID(e.target.value)
}
    return (
      <div>
        <div>
            <label >QUIZ: </label>
            <select className="category-select" onChange={handleSelectChange}>
                {!leaderboardID && (<option key={-1} >Select Quiz</option>)
                }
                {leaderboards.map((lb, index) => (
                  <option key={index} value={lb._id}>{lb.name}</option>
                ))}
            </select>    
        </div>        
      <div>
        {leaderboard && leaderboard.scores && leaderboard.scores.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.scores.map((entry, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{entry.user}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>


    );
};

export default Leaderboard;