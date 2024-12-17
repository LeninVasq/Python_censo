import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Poblacion from './views/Poblacion';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Poblacion/>} />
    </Routes>

  );
}

export default App;
