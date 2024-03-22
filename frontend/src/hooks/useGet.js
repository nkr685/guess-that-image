export const useGet = () => {

    const getAllCategories = async()=> {
        const response = await fetch(`api/Categories`)
        return await response.json()
    }

    const getAllQuizzes = async()=> {
        const response = await fetch(`/api/Quizzes/`) 
        return await response.json()
    }
    const getQuiz = async(id)=> {
        const response = await fetch(`/api/Quizzes/${id}`) 
        return await response.json()
    }

    const getAllLeaderboards = async()=> { 
        const response = await fetch(`api/Leaderboards/`)
        if (response.ok) {
            return await response.json()
        }
    }

    const getLeaderboard = async (id) => { 
        const response = await fetch(`/api/Leaderboards/${id}`)
        if (response.ok) {
            return await response.json()
        }
    }

    const getAllImages = async (quizID) => {
        const response = await fetch(`/api/Images?quizID=${quizID}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        return await response.json(); // Returns a dictionary of images
    } 

    return { getAllCategories, getAllQuizzes, getQuiz, getAllLeaderboards, getLeaderboard, getAllImages }

}