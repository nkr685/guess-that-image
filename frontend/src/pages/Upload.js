import React, { useState, useEffect } from 'react';
import { useCategory } from '../hooks/useCategory';
import { useImage } from '../hooks/useImage';
import { useQuiz } from '../hooks/useQuiz';
import { useLeaderboard } from '../hooks/useLeaderboard';

const Upload = () => {
    // hooks
    const { createCategory, getAllCategories, updateCategory} = useCategory();
    const { createImages } = useImage();
    const { createQuiz } = useQuiz();
    const { createLeaderboard } = useLeaderboard();

    // local vars
    const [ categories, setCategories] = useState(null)

    useEffect(() => {
        const fetchCategories = async () => {
            const json = await getAllCategories()
            setCategories(json)
        }
        fetchCategories()
    }, []);

    const categoryStructure = {
        categoryName: '',
        quizIDs: [],
    };

    const quizStructure = {
        quizName: '',
        thumbnailUrl: '',
        imageIDs: [],
        leaderboardID: '',
    };

    const leaderboardStructure = {
        quizName: '',
        scores: [],
    };

    const [categoryData, setCategoryData] = useState(categoryStructure);
    const [quizData, setQuizData] = useState(quizStructure);
    const [leaderboardData, setLeaderboardData] = useState(leaderboardStructure);
    const [imageData, setImageData] = useState({});

    const handleCategoryNameChange = (e) => {
        const { name, value } = e.target;
        const matchingCategory = categories.filter((category) => category.categoryName === value)[0];
        if (!matchingCategory) {
            setCategoryData(() => ({ ...categoryStructure, [name]: value }));
        } else {
            setCategoryData(() => ({ ...matchingCategory, quizIDs: matchingCategory.quizIDs }));
        }
    };

    const handleQuizNameChange = (e) => {
        const { name, value } = e.target;
        setQuizData((prevData) => ({ ...prevData, [name]: value }));
        setLeaderboardData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleQuizThumbnailChange = (e) => {
        const { name, value } = e.target;
        setQuizData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const fileContent = await file.text();
                const jsonData = JSON.parse(fileContent);
                setImageData(jsonData);
            } catch (error) {
                console.error('Error reading file:', error);
            }
        }
    };

    const handleUpload = async () => {
        const imageIDs = await createImages(imageData);
        const leaderboardResponse = await createLeaderboard(leaderboardData);
        const leaderboardID = leaderboardResponse.createdObjectId;
        const newQuizData = { ...quizData, imageIDs, leaderboardID };
        const quizResponse = await createQuiz(newQuizData);
        const quizID = quizResponse.createdObjectId;
        const quizIDs = [...categoryData.quizIDs, quizID];
        const newCategoryData = { ...categoryData, quizIDs };

        if (!categoryData._id) {
            createCategory(newCategoryData);
        } else {
            updateCategory(newCategoryData);
        }
    };

    return (
        <div className="upload-container">
            <div className="upload-form">
                <label className="upload-label">Category Name:</label>
                <input
                    type="text"
                    name="categoryName"
                    value={categoryData.categoryName}
                    onChange={handleCategoryNameChange}
                    className="upload-input"
                />

                <label className="upload-label">Quiz Name:</label>
                <input
                    type="text"
                    name="quizName"
                    value={quizData.quizName}
                    onChange={handleQuizNameChange}
                    className="upload-input"
                />

                <label className="upload-label">Quiz Thumbnail:</label>
                <input
                    type="text"
                    name="thumbnailUrl"
                    value={quizData.thumbnailUrl}
                    onChange={handleQuizThumbnailChange}
                    className="upload-input"
                />

                <label className="upload-label">Choose File:</label>
                <input type="file" onChange={handleFileChange} className="upload-file-input" />
                <label className="upload-file-label">Upload File</label>

                <button onClick={handleUpload} className="upload-button">
                    Send to DB
                </button>

                <div>
                    <h3 className="upload-heading">Category Collection:</h3>
                    <pre className="upload-pre">{JSON.stringify(categoryData, null, 2)}</pre>
                </div>
                <div>
                    <h3 className="upload-heading">Quiz Collection:</h3>
                    <pre className="upload-pre">{JSON.stringify(quizData, null, 2)}</pre>
                </div>
                <div>
                    <h3 className="upload-heading">Leaderboard Collection:</h3>
                    <pre className="upload-pre">{JSON.stringify(leaderboardData, null, 2)}</pre>
                </div>
                <div>
                    <h3 className="upload-heading">Image Collection:</h3>
                    <pre className="upload-pre">{JSON.stringify(imageData, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
};

export default Upload;
