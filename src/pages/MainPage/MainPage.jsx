import Created from 'pages/Created';
import CreateHero from 'pages/CreateHero';
import WelcomePage from 'pages/WelcomePage';
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import HeroPage from '../HeroPage';

const MainPage = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
        <Route exact path="/create" element={<CreateHero />} />
        <Route exact path="/created" element={<Created />} />
        <Route exact path="/hero/:id" element={< HeroPage />} />
        <Route exact path="/not-found" element={<div />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default MainPage