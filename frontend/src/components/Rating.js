import { useState } from "react";


const Rating = (props) => {
    const { userRating, submitRating } = props

    const [hover, setHover] = useState(false)
    const [rating, setRating ] = useState(userRating)
    const [tempRating, setTempRating] = useState(0)

    const handleEnterHover = (value) => {
        setHover(true)
        setTempRating(value);
    }

    const handleExitHover = (value) => {
        setHover(false)
        setTempRating(value);
    }

    const handleClick = (value) => {
        submitRating(value)
        setRating(value)
    }

    return (
        <div className="star-rating">
        {[ 1, 2, 3, 4, 5 ].map((value) => (
            <span
            key={value}
            className={hover ? (value <= tempRating ? "star filled": "star") : (value <= rating ? "star filled": "star")}
            onMouseEnter={() => handleEnterHover(value)}
            onMouseLeave={() => handleExitHover(0)}
            onClick={() => handleClick(value)}
            >
            ★
            </span>
        ))}
        </div>
    )
}

export default Rating
