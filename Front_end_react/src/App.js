import React, { useState } from 'react';
import Navbar from './components/navbar';
import Poblacion from './views/poblacion';
import Tics from './views/tics';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch (currentView) {
      case 'poblacion':
        return <Poblacion />;
      case 'tics':
        return <Tics />;
      default:
        return <h1>Ninguna Vista Cargada</h1>;
    }
  };

  return (
    <div>
      <Navbar setCurrentView={setCurrentView} />
      {renderView()}
    </div>
  );
}

export default App;
