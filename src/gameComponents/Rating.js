import { useState } from "react";


const Rating = (props) => {
    const { user, ratings, userRating, submitRating } = props

    const [hover, setHover] = useState(false)
    const [rating, setRating ] = useState(userRating)
    const [tempRating, setTempRating] = useState(0)
    const [count, setCount] = useState(0)
    const [meanRating, setMeanRating] = useState(0)

    
    const averageRating = (() => {
        let totalScore = 0;
        let num = 0;

        ratings[user._id] = rating
        console.log(ratings)
        for (const userID in ratings) {
            if (Object.prototype.hasOwnProperty.call(ratings, userID)) {
                totalScore += ratings[userID];
                num++;
            }
        }
        setMeanRating(totalScore/num)
        setCount(num)

    })

    const handleEnterHover = (value) => {
        setHover(true)
        setTempRating(value);
    }

    const handleExitHover = (value) => {
        setHover(false)
        setTempRating(value);
    }

    const handleClick = (value) => {
        if (user) {
            submitRating(value)
            averageRating()
            setRating(value)            
        }
    }

    return (
        <div className="star-rating">
        {[ 1, 2, 3, 4, 5 ].map((value) => (
            <span
            key={value}
            className={hover ? (value <= tempRating ? "star filled": "star") : (value <= rating ? "star filled": "star")}
            // onMouseEnter={() => handleEnterHover(value)}
            // onMouseLeave={() => handleExitHover(0)}
            onClick={() => handleClick(value)}
            >
            ★
            </span>
        ))}
        <span> {meanRating} ({count})</span>
        </div>
    )
}

export default Rating
