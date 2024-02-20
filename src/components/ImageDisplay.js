import { useContext, useState, useEffect } from "react";
import { GameContext } from "../context/GameContext";

const ImageDisplay = () => {
    
    // global vars
    const { gameActive, imageUrl, imageName, next} = useContext(GameContext)

    // local vars
    const placeholderUrl = "https://upload.wikimedia.org/wikipedia/commons/2/25/Icon-round-Question_mark.jpg"
    const limit = 3;
    const height = 600;
    const width = 1000;
    const [heightMultiplier, setHeightMultiplier] = useState(0);
    const [widthMultiplier, setWidthMultiplier] = useState(0);
    const [count, setCount] = useState(0);
    const widthOffset = widthMultiplier * (width/4 - (width/4 * (count/ limit)))
    const heightOffset = heightMultiplier * (height/4 - (height/4 * (count/ limit)))
    const [url, setUrl] = useState(placeholderUrl)
    const [zoom, setZoom] = useState(1);
    const [hintText, setHintText] = useState(`Hint ${count}/${limit}`)

    // updates image
    useEffect(() => {
        if (gameActive) {
            setZoom(limit+1)
            setUrl(imageUrl)
            setHeightMultiplier(Math.random() * 2 - 1);
            setWidthMultiplier(Math.random() * 2 - 1);
        } else {
            setZoom(1) // zoom 1x is original size
            setUrl(placeholderUrl)
            setHeightMultiplier(0);
            setWidthMultiplier(0);
        }
        setCount(0)
        setHintText(`Hint ${count}/${limit}`)
    }, [gameActive, imageUrl]);

    // zooming
    const handleZoomOut = () => {
        if (count < limit) {
            setCount(count+1) 
            setHintText(`Hint ${count+1}/${limit}`) // count from previous line doesnt update yet, just use +1 here to show correctly on website
            setZoom(zoom-1);
        }
    };

    // resets hints
    useEffect(() => {
        if (next) {
            setCount(0)
            setHintText(`Hint ${count}/${limit}`)
        }
    }, [next])

    return (
        <>
        <div className="image-container" style={{width, height}}>
            <img className="image" src={url} alt={imageName} style={{    
                transform: `scale(${zoom}) translate(${widthOffset}px, ${heightOffset}px)`,
            }}></img>
        </div>
        <div >
            <button className="hint-button" onClick={handleZoomOut} disabled={!gameActive}>{hintText}</button>
        </div></>
    )
}

export default ImageDisplay