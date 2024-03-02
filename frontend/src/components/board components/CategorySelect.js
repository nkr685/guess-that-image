import { useContext, useEffect, useState} from "react";
import { GameContext } from "../../context/GameContext";

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
                <option value="car_logos">Car Brands</option>
                <option value="brands">Popular Brands</option>
                <option value="pokemon">Pokemon</option>
                <option value="nba">NBA Teams</option>
                <option value="nfl">NFL Teams</option>
                <option value="state_maps">State Maps</option>
                <option value="landmarks">Global Landmarks</option>
            </select>    
        </div>
    );
}

export default CategorySelectBox