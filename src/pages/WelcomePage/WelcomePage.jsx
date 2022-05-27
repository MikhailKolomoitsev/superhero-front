import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './WelcomePage.scss'
import ContentLoader from 'components/ContentLoader';
import HeroCard from 'components/HeroCard';
import { NavLink } from 'react-router-dom';

const WelcomePage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [heroes, setHeroes] = useState([])
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('http://localhost:5000/api/hero');
      setHeroes(data)
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <ContentLoader visible={isLoading} />
      <div className='container'>
        <h1>Welcome to Superheros Generator</h1>
        <p>Here is list - try to find your favorite, or add him!👇</p>
        <NavLink to='/create'>Create Your Hero</NavLink>
        <ul >
          {heroes && heroes.map(hero => {
            return (<li key={hero["_id"]}><HeroCard nickname={hero.nickname} image={hero.images[0]} /></li>)
          })}
        </ul>
      </div>
    </>
  )
}

export default WelcomePage