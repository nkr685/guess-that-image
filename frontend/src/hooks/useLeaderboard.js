export const useLeaderboard = () => {

    // gets all leaderboards to populate leaderboard select on Leaderboard page
    const getAllLeaderboards = async()=> { 
        const response = await fetch(`api/Leaderboards/`)
        if (response.ok) {
            return await response.json()
        }
    }

    // gets single leaderboard to display scores on Leaderboard page
    const getLeaderboardByID = async (id) => { 
        const response = await fetch(`/api/Leaderboards/${id}`)
        if (response.ok) {
            return await response.json()
        }
    }

    // creates leaderboard from Upload page
    const createLeaderboard = async (leaderboardData) => {
        const response = await fetch(`/api/Leaderboards/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(leaderboardData)
        })
        return await response.json() // returns leaderboard id
    }

    // submits score from PlayGame page
    const updateLeaderboard = async (leaderboard) => {
        console.log(leaderboard)
        const response = await fetch(`/api/Leaderboards/${leaderboard.leaderboardId}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(leaderboard)
        })
        return await response.json()
    }

    return { getAllLeaderboards, getLeaderboardByID, createLeaderboard, updateLeaderboard}
}
