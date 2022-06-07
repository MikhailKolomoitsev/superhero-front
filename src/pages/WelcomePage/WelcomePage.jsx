import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './WelcomePage.scss'
import ContentLoader from 'components/ContentLoader';
import HeroCard from 'components/HeroCard';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const WelcomePage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [heroes, setHeroes] = useState([])
  const [heroesOnPage, setHeroesOnPage] = useState(3)
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('https://immense-anchorage-36138.herokuapp.com/api/hero');
      setHeroes(data)
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <ContentLoader visible={isLoading} />
      <div className='container'>
        <h1 className='page-heading'>Welcome to Superheros Generator</h1>
        <p className='page-desc'>Here is list - try to find your favorite, or add him!👇</p>
        <NavLink to='/create' className='create-hero'>Create Your Hero</NavLink>
        <ul className='heroes-list'>
          {heroes && heroes.slice(0, heroesOnPage).map(hero => {
            return (<li
              className='heroes-list-item'
              onClick={() => {
                navigate(`/hero/${hero["_id"]}`)
              }}
              key={hero["_id"]}><HeroCard nickname={hero.nickname} image={hero.images[0]} /></li>)
          })}
        </ul>
        {heroes.length > heroesOnPage && <Button
          onClick={() => {
            setHeroesOnPage(prev => prev + 3)
          }}
          variant="text"
          color='info'
        >Load More</Button>}
      </div>
    </>
  )
}

export default WelcomePage