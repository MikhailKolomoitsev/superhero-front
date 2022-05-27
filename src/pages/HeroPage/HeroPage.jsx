import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from 'services/api'
import './HeroPage.scss'

const HeroPage = () => {
  const [heroData, setHeroData] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      const { data } = await api.getById(id)
      setHeroData(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const updateHero = async () => {
      await api.updateById(id, heroData)
    }
    updateHero()
  }, [heroData, id])
  

  return (
    <div>
      {heroData &&
        <div className='hero'>
          <h3>{heroData.nickname}</h3>
          <img
            className='hero-main-picture'
            src={heroData.images[0]} alt={heroData.nickname} />
          <h3>Superpowers list</h3>
          <ul className='hero-superpowers_list'>
            {heroData.superpowers.split(',').map(i => <li key={i}>{i}</li>)}
          </ul>
          <ul className='hero-images_list'>
            {heroData.images.map(img => <li
              className='hero-images_list-item'
              key={img}>
              <img
                className='hero-images_list-item-image'
                src={img} alt={heroData.nickname} />
              <Button
                id={img}
                color='error'
                className='hero-images_list-item_delete-button'
                onClick={(e) => {
                  setHeroData((prevState) => ({
                    ...prevState,
                    images: prevState.images.filter(i => i !== e.target.id)
                  }))
                }}
                type='button'> Delete Picture</Button>
            </li>)}
          </ul>
        </div>
      }

    </div>
  )
}

export default HeroPage