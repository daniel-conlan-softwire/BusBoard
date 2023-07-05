import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BusBoardApp from './busBoard/BusBoardApp';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapBoardApp from './mapBoard/MapBoardApp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/busBoard' element={<BusBoardApp />} />
        <Route path='/' element={<MapBoardApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
