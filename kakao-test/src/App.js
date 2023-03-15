import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {KakaoUserContext} from './context/kakaoUserContext';
import Home from './pages/home/Home';
import Redirect from './pages/redirect/Redirect';
import {useState} from 'react';
import FriendsRedirect from './pages/redirect/FriendsRedirect';


function App() {
    const [kakaoUserData, setKakaoUserData] = useState('')

  return (
      <KakaoUserContext.Provider value={{kakaoUserData, setKakaoUserData}}>
          <Router>
              <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/redirect' element={<Redirect/>} />
                  <Route path='/friends/redirect' element={<FriendsRedirect/>} />
              </Routes>
          </Router>
      </KakaoUserContext.Provider>

  )
}

export default App;
