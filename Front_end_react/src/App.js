import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Poblacion from './python/poblacion';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Poblacion/>} />
    </Routes>

  );
}

export default App;
