import React from 'react';
import { Link } from 'react-router-dom';
import "../css/components/Card.css"
import { useState, useEffect } from 'react';

const Card = ({ title, thumbnail, linkTo, onClick }) => {
    const cardHeight = 250
    const cardWidth = 200
    const [imgSize, setImgSize] = useState({ width: 0, height: 0 })


    useEffect(() => {
        const img = new Image()
        img.src = thumbnail
        img.onload = () => {
            setImgSize({ width: img.naturalWidth, height: img.naturalHeight })
        }
    }, [thumbnail])

    const { width, height } = imgSize

    return (
    <div className="card-container">
        <Link to={linkTo} className="card-link" onClick={onClick}>
            <h3 className="card-title">{title}</h3>
                <img src={thumbnail} alt={`Thumbnail for ${title}`} className="card-thumbnail" 
                style={(height > width) ? {width: cardWidth} : {height: cardHeight*.9}}/>
        </Link>
    </div>)
};

export default Card;