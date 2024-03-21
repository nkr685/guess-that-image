export const useQuiz = () => {

    const getAllQuizzes = async()=> {
        const response = await fetch(`/api/Quizzes/`) // http://localhost:4000 REMOVED AFTER ADDING PROXY
        return await response.json()
    }
    const getQuiz = async(quizID)=> {
        const response = await fetch(`/api/Quizzes/${quizID}`) // http://localhost:4000 REMOVED AFTER ADDING PROXY
        return await response.json()
    }
    return { getAllQuizzes, getQuiz }
}