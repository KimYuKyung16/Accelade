import React from 'react';
import GlobalStyle from '../src/styles/GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from '@pages/Home';
import Sector from '@pages/Sector';
import CorporationDetail from '@pages/CorporationDetail';
import _Search from '@pages/Search';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/corporation" element={<Sector />}></Route>
          <Route
            path="/corporation/:id"
            element={<CorporationDetail />}
          ></Route>
          <Route path="/search" element={<_Search />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
