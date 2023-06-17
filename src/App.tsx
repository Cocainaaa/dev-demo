import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ProductPage } from './pages/ProductPage';
import { NotFound } from './components/NotFound';
import {Header} from './components/Header';
import { VideoChat } from './components/VideoChat';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
