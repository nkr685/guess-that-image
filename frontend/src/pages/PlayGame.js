import { useState, useEffect, useContext } from 'react';
import { GameContext } from '../context/GameContext';
import Board from '../components/Board';

const PlayGame = () => {
    // global vars
    const { category, setCategory } = useContext(GameContext)

    // local vars
    const [imageUrls, setImageUrls] = useState(null)

    // GET IMAGES FROM DATABASE BEFORE RUNNING APP!!!!
    useEffect(() => {
        const fetchImageUrls = async()=> {
            const response = await fetch(`api/ImageUrls?category=${category}`) // http://localhost:4000 REMOVED AFTER ADDING PROXY
            const json = await response.json()
            if (response.ok) {
                setImageUrls(json)
            }
        }

        fetchImageUrls()
    }, [category, setImageUrls])


    // returns loading screen until database loaded
    if (!imageUrls || imageUrls.length === 0) {
        return (
        <div className="App">
            <header className="Loading-header">
            Loading Game
            </header>
        </div>
        );
    }
    
    return (
        <header className="App-header">
            <Board imageUrls={imageUrls}/>
        </header>
    )
}

export default PlayGame