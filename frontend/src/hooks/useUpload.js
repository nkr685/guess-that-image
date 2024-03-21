export const useUpload = () => {

    const uploadNewQuiz = async (imageData) => {
        const response = await fetch(`/api/Upload/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(imageData)
        })
        return "test" // await response.json() // returns list of ids
    }

    return { uploadNewQuiz}
}