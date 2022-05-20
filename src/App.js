import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import s from './App.module.css';


function App() {
  return (
    <BrowserRouter>
      <div className={s.app} id="test-app">
        <MainPage />
      </div>
    </BrowserRouter>
  );
}

export default App;
