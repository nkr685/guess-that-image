import "../css/gameComponents/ImageDisplay.css"

import { useState, useEffect } from "react";

const ImageDisplay = (props) => {
    // passed properties from Board component
    const { imageUrl, imageName, gameActive, height, width, count, limit } = props

    // local vars
    const [heightMultiplier, setHeightMultiplier] = useState(0);
    const [widthMultiplier, setWidthMultiplier] = useState(0);
    const widthOffset = widthMultiplier * (width/4 - (width/4 * (count/ limit)))
    const heightOffset = heightMultiplier * (height/4 - (height/4 * (count/ limit)))

    // runs only at game start/end, resets vars to default
    useEffect(() => {
        if (!gameActive) {
            setHeightMultiplier(0);
            setWidthMultiplier(0);
        }
    }, [gameActive])

    // runs everytime image is updated, resets hints and randomizes image zoom/position
    useEffect(() => {
        if (gameActive) {
            setHeightMultiplier(Math.random() * 2 - 1);
            setWidthMultiplier(Math.random() * 2 - 1);
        }
    }, [imageUrl])

    return (
        <div className="game-image-container" style={{width, height}}>
            <img src={imageUrl} alt={imageName} 
                style={gameActive 
                ? ((count < limit) 
                ? {transform: `scale(${limit-count+1}) translate(${widthOffset}px, ${heightOffset}px)`} 
                : {}) :
                {transform: `scale(${1}) translate(${widthOffset}px, ${heightOffset}px)`} }> 

            </img>
        </div>
    )
}

export default ImageDisplay