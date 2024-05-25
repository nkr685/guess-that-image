import { useState, useEffect } from "react"
import "../css/gameComponents/StackedImageDisplay.css"
const StackedImageDisplay = (props) => {
    // passed properties from Board component
    const { backgroundImageUrl, imageUrl, imageName, gameActive, height, width, count, limit } = props

    //local vars
    const [imgSize, setImgSize] = useState({ width: 0, height: 0 })
    
    useEffect(() => {
        const img = new Image()
        img.src = backgroundImageUrl
        img.onload = () => {
            setImgSize({ width: img.naturalWidth, height: img.naturalHeight })
        }
    }, [backgroundImageUrl])

    return (
        <div className="game-stack-image-container" style={{height, width}}>
            <img className="game-stack-background" src={backgroundImageUrl} style={(imgSize.height > imgSize.width) ? {width} : {height}} />
            {gameActive && 
                <img className="game-stack-overlay" src={imageUrl} alt={imageName} 
                    style={{ transform: ` translate(${width/16}px, ${(-height)+50}px) `, 
                    filter: `brightness(${(count < limit) ? count/limit*100 : 100}%)`}}/> }
        </div>

    )
}

export default StackedImageDisplay