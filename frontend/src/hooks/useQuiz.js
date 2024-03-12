export const useQuiz = () => {

    const getAllQuizzes = async()=> {
        const response = await fetch(`/api/Quizzes/`) // http://localhost:4000 REMOVED AFTER ADDING PROXY
        return await response.json()
    }

    const createQuiz = async (quizData) => {
        const response = await fetch(`/api/Quizzes/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(quizData)
        });
    
        // Check for success status before parsing JSON
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        return await response.json(); // returns the JSON object
    };

    return { createQuiz, getAllQuizzes }
}