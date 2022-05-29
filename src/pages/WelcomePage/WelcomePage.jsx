import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './WelcomePage.scss'
import ContentLoader from 'components/ContentLoader';
import HeroCard from 'components/HeroCard';
import { NavLink, useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [heroes, setHeroes] = useState([])
  const navigate = useNavigate();
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
        <ul className='heroes-list'>
          {heroes && heroes.map(hero => {
            return (<li
              className='heroes-list-item'
              onClick={() => {
                navigate(`/hero/${hero["_id"]}`)
                }}
              key={hero["_id"]}><HeroCard nickname={hero.nickname} image={hero.images[0]} /></li>)
          })}
        </ul>
      </div>
    </>
  )
}

export default WelcomePage