import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {KakaoUserContext} from './context/kakaoUserContext';
import Home from './pages/home/Home';
import Redirect from './pages/redirect/Redirect';
import {useState} from 'react';


function App() {
    const [kakaoUserData, setKakaoUserData] = useState('')

  return (
      <KakaoUserContext.Provider value={{kakaoUserData, setKakaoUserData}}>
          <Router>
              <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/redirect' element={<Redirect/>} />
              </Routes>
          </Router>
      </KakaoUserContext.Provider>

  )
}

export default App;
