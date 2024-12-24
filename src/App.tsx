import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RepositoryPage } from './pages/RepositoryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/repository/:name" element={<RepositoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;