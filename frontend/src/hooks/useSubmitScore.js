import { useState } from "react";

export const useSubmitScore= () => {

    const submitScore = async (leaderboard) => {
        const response = await fetch(`/api/Leaderboard/${leaderboard._id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(leaderboard)
        })
        await response.json()
    }

    return { submitScore}
}