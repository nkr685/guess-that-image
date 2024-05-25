export const useSend = () => {

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
        const response = await fetch(`/api/Leaderboards/${leaderboard.leaderboardId}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(leaderboard)
        })
        return await response.json()
    }

    // submits rating from PlayGame page
    const updateQuiz = async (quiz) => {
        const response = await fetch(`/api/Quizzes/${quiz._id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(quiz)
        })
        return await response.json()
    }

    // creates all data from Upload page
    const createGame = async (gameData) => {
        const response = await fetch(`/api/Upload/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(gameData)
        })
        return await response.json()
    }

    const modifyUser = async (userID, userData) => {
        const response = await fetch(`/api/Users/${userID}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
        })
        return await response.json()
    }

    return { createLeaderboard, updateLeaderboard, createGame, updateQuiz, modifyUser}
}