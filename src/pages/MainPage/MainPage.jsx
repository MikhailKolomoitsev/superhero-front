import CreateHero from 'pages/CreateHero';
import WelcomePage from 'pages/WelcomePage';
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import HeroPage from '../HeroPage';

const MainPage = () => {
  return (
      <div>
          <Routes>
        <Route exact path="/main" element={<WelcomePage/>} />
              <Route exact path="/create" element={<CreateHero/>} />
              <Route exact path="/hero/:id" element={< HeroPage />} />
              <Route exact path="/not-found" element={<div />} />
              <Route path="/*" element={<Navigate to="/main" />} />
          </Routes>
    </div>
  )
}

export default MainPage