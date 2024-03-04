import { useState, useEffect, useContext } from 'react';
import Card from '../components/Card';
import { GameContext } from '../context/GameContext';

const Home = () => {
    // global vars
    const   {     
      setCategory, setCategoryName
      } = useContext(GameContext)

    // local vars
    const [categories, setCategories] = useState(null)


    useEffect(() => {
        const fetchCategories = async()=> {
            const response = await fetch(`api/Categories`) // http://localhost:4000 REMOVED AFTER ADDING PROXY
            const json = await response.json()
            if (response.ok) {
                setCategories(json)
            }
        }

        fetchCategories()
    }, [categories])

    // returns loading screen until database loaded
    if (!categories || categories.length === 0) {
        return (
        <div className="Loading-header">
            <header >
            Loading Home
            </header>
        </div>
        );
    }

    const handleCardClick = (item) => {
      setCategory(item.dataset)
      setCategoryName(item.name)
    }

    return (
        <div className='home'>
          {categories.map((category, idx1) => (
            <div key={idx1}>
              <h2 style={{fontSize: 30}}>{category.category}</h2>
              <div className="card-container">
                {category.quiz.map((item, idx2) => (
                  <Card key={idx2} title={item.name} thumbnail={item.thumbnail} linkTo="/game" onClick={()=> handleCardClick(item)}/>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
}

export default Home