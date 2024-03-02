import { useState, useEffect } from 'react';
import Card from '../components/Card';

const Home = () => {
    // global vars

    // local vars
    const [categories, setCategories] = useState(null)

    // GET IMAGES FROM DATABASE BEFORE RUNNING APP!!!!
    useEffect(() => {
        const fetchCategories = async()=> {
            const response = await fetch(`api/Categories`) // http://localhost:4000 REMOVED AFTER ADDING PROXY
            const json = await response.json()
            if (response.ok) {
                setCategories(json)
            }
        }

        fetchCategories()
    }, [categories, setCategories])

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
    return (
        <div>
          {categories.map((category, idx1) => (
            <div key={idx1}>
              <h2>{category.category}</h2>
              <div className="card-container">
                {category.quiz.map((item, idx2) => (
                  <Card key={idx2} title={item.name} thumbnail={item.thumbnail} linkTo={`/game`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      );
}

export default Home