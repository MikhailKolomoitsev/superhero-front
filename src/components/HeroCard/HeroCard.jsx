import React from 'react'
import PropTypes from 'prop-types';
import './HeroCard.scss'

const HeroCard = ({nickname, image}) => {
  return (
      <div className='hero-card'>
      <img className="hero-card--avatar-img" src={image} alt="avatar" />
          <h3 className='hero-card--nickname'>{nickname}</h3>
    </div>
  )
}

HeroCard.propTypes = {
  nickname: PropTypes.string,
  image: PropTypes.string,
}

HeroCard.defaultProps = {
  nickname: 'hero',
  image: 'https://upload.wikimedia.org/wikipedia/ru/c/cb/AmazingSpiderMan50.jpg'
}

export default HeroCard