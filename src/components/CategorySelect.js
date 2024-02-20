import { useContext, useEffect, useState} from "react";
import { GameContext } from "../context/GameContext";

const CategorySelectBox = () => {

    // global vars
    const { gameActive, category, setCategory} = useContext(GameContext)

    // updates value when changing category
    const handleSelectChange = (e) => {
        setCategory(e.target.value)
    }

    return (
        <div>
            <label >CATEGORY: </label>
            <select className="category-select" value={category} onChange={handleSelectChange} disabled={gameActive}>
                <option value="car_logos">Car Logos</option>
                <option value="brands">Brands</option>
            </select>    
        </div>
    );
}

export default CategorySelectBox