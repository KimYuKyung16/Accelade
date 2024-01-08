import React from 'react';
import GlobalStyle from '../src/styles/GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from '@pages/Home';
import Sector from '@pages/Sector';
import CorporationDetail from '@pages/CorporationDetail';
import _Search from '@pages/Search';
import Login from '@pages/admin/Login';
import Main from '@pages/admin/Main';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/corporation" element={<Sector />}></Route>
          <Route
            path="/corporation/:id"
            element={<CorporationDetail />}
          ></Route>
          <Route path="/search" element={<_Search />}></Route>

          {/* 관리자 페이지 */}
          <Route path="/admin/login" element={<Login />}></Route>
          <Route path="/admin" element={<Main />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
