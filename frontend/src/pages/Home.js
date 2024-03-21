import { useState, useEffect, useContext } from 'react';
import Card from '../components/Card';
import { GameContext } from '../context/GameContext';
import { useCategory } from '../hooks/useCategory';
import { useQuiz } from '../hooks/useQuiz';

const Home = () => {
    // // global vars
    const {setQuiz} = useContext(GameContext)

    // local vars
    const [categories, setCategories] = useState(null)
    const [quizzes, setQuizzes] = useState(null)

    // hooks
    const { getAllCategories } = useCategory()    
    const { getAllQuizzes } = useQuiz()

    useEffect(() => {
        const fetchQuizzes = async()=> {
            const json = await getAllQuizzes()
            if (json) {
                const quizzesDict = json.reduce((newDict, quiz) => { // turns array into dict for easier indexing
                    newDict[quiz._id] = quiz;
                    return newDict;
                }, {} )
                setQuizzes(quizzesDict)
            }
        }
        if (!quizzes) {
            fetchQuizzes()
        }
    }, [quizzes])

    useEffect(() => {
        const fetchCategories = async()=> {
            const json = await getAllCategories()
            setCategories(json)
        }
        if (!categories) {
            fetchCategories()
        }
    }, [categories])

    // returns loading screen until database loaded
    if (!categories || !quizzes || categories.length === 0) {
        return (
        <div className="Loading-header">
            <header >
            Loading Home
            </header>
        </div>
        );
    }

    const handleCardClick = (_quiz) => {
        setQuiz(_quiz)
        sessionStorage.setItem('quiz', JSON.stringify(_quiz))
    }

    return (
        <div className='home'>
        {categories.map((category, idx1) => (
            <div key={idx1}>
            <h2 style={{fontSize: 30}}>{category.categoryName}</h2>
            <div className="card-container">
                {category.quizIDs.map((quizID, idx2) => (
                <Card key={idx2} title={quizzes[quizID].quizName} thumbnail={quizzes[quizID].thumbnailUrl} linkTo={`/game/${quizID}`} onClick={()=> handleCardClick(quizzes[quizID])}/>
                ))}
            </div>
            </div>
        ))}
        </div>
    );
}

export default Home