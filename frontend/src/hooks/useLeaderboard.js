import { useState } from "react";

export const useLeaderboard = () => {
    const [ leaderboard, setLeaderboard ] = useState({})
    const getLeaderboard = async (id) => {

        const response = await fetch(`/api/Leaderboard/${id}`, {
            method: 'GET'
        })
        setLeaderboard(await response.json())
    }

    return { getLeaderboard, setLeaderboard, leaderboard }
}