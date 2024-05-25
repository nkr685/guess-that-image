import { useState, useEffect } from "react";

const StackedImageDisplay = (props) => {
    // passed properties from Board component
    const { imageUrl, imageName, gameActive, height, width, limit } = props

    // local vars
    const [count, setCount] = useState(0)
    const [heightMultiplier, setHeightMultiplier] = useState(0);
    const [widthMultiplier, setWidthMultiplier] = useState(0);
    const widthOffset = widthMultiplier * (width/4 - (width/4 * (count/ limit)))
    const heightOffset = heightMultiplier * (height/4 - (height/4 * (count/ limit)))
    const [zoom, setZoom] = useState(1);
    const [hintText, setHintText] = useState(`Hint 0/${limit}`)

    // runs only at game start/end, resets vars to default
    useEffect(() => {
        if (!gameActive) {
            setZoom(1) // zoom 1x is original size
            setHeightMultiplier(0);
            setWidthMultiplier(0);
            setCount(0)
            setHintText(`Hint 0/${limit}`)    
        }
    }, [gameActive])

    // runs everytime image is updated, resets hints and randomizes image zoom/position
    useEffect(() => {
        if (gameActive) {
            setZoom(limit+1)
            setHeightMultiplier(Math.random() * 2 - 1);
            setWidthMultiplier(Math.random() * 2 - 1);
            setCount(0)
            setHintText(`Hint 0/${limit}`)    
        }
    }, [imageUrl])

    // zooming image 
    const handleZoomOut = () => {
        if (count < limit) {
            setCount(count+1) 
            setHintText(`Hint ${count+1}/${limit}`) // count from previous line doesnt update yet, just use +1 here to show correctly on website
            setZoom(zoom-1);
        }
    };

    return (
        <>
        <div className="stack-image-container" style={{width, height}}>
            <img className="background" src={"https://images3.alphacoders.com/677/677583.png"} />
            {imageUrl ? 
            <img className="overlay" src={imageUrl} alt={imageName} style={{transform: ` translate(${width/16}px, ${(-height)+100}px) `, 
                filter: `brightness(${count/limit*100}%) sepia(${(1-(count/limit))*100}%) hue-rotate(${(1-(count/limit))*360}deg)`}}/> : <img/>  }
        </div>
        <div >
            <button className="hint-button" onClick={handleZoomOut} disabled={!gameActive}>{hintText}</button>
        </div></>
    )
}

export default StackedImageDisplay