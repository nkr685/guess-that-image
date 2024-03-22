const mongoose = require('mongoose')

const uploadEntities = async (uploadData) => {
    const { categoryID, categoryName, quizIDs, quizName, thumbnailUrl, author, description, imageData, params} = uploadData
    newQuizID = new mongoose.Types.ObjectId()
    imageData.forEach(image => {
        image["quizReferenceID"] = newQuizID
    })
    const imageIDs = await createImages(imageData)
    const leaderboardResponse = await createLeaderboard(quizName)
    const leaderboardID = leaderboardResponse.createdObjectId
    const newQuizData = {_id: newQuizID, quizName, thumbnailUrl, leaderboardID, imageIDs, author, description}
    await createQuiz(newQuizData)
    const newQuizIDs = [...quizIDs, newQuizID.toString()]
    const newCategoryData = { _id: categoryID, categoryName, quizIDs:newQuizIDs }
    if (!categoryID) {
        createCategory(newCategoryData)
    } else {
        updateCategory(categoryID, newCategoryData)
    }     
}

const createImages = async (imageData) => {
    const response = await fetch(`http://localhost:4000/api/Images/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(imageData)
    })
    return await response.json() // returns list of ids
}

const createLeaderboard = async (quizName) => {
    const response = await fetch(`http://localhost:4000/api/Leaderboards/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({quizName})
    })
    return await response.json() // returns leaderboard id
}

const createQuiz = async (quizData) => {
    const response = await fetch(`http://localhost:4000/api/Quizzes/`, {
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


const createCategory = async (categoryData) => {
    const response = await fetch(`http://localhost:4000/api/Categories/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(categoryData)
    })
    return await response.json()
}

const updateCategory = async (categoryID, categoryData) => {
    const response = await fetch(`http://localhost:4000/api/Categories/${categoryID}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(categoryData)
    })
    return await response.json()
}

module.exports = {uploadEntities}