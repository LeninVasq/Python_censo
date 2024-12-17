import React, { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // Importando íconos para el modo claro y nocturno
import logo from '../images/pandas.webp'; // Asegúrate de que la ruta sea correcta

function Navbar({ setCurrentView }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Cambiar el modo nocturno
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <nav className={`bg-green-600 dark:bg-green-800 p-4 shadow-md transition-all`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo y título pegado al lado izquierdo */}
        <div className="flex items-center space-x-2"> {/* Sin ml-auto, para alinear a la izquierda */}
          <img src={logo} alt="Logo Los Pandas" className="w-20 h-13" /> {/* Logo */}
          <div className="text-white text-2xl font-bold">
            LOS PANDAS - CENSO Analysis
          </div>
        </div>

        {/* Enlaces de navegación */}
        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentView('home')}
            className="text-white hover:bg-green-500 hover:text-black dark:hover:bg-green-700 dark:hover:text-white px-4 py-2 rounded-md transition-all">
            Inicio
          </button>
          <button
            onClick={() => setCurrentView('poblacion')}
            className="text-white hover:bg-green-500 hover:text-black dark:hover:bg-green-700 dark:hover:text-white px-4 py-2 rounded-md transition-all">
            Población
          </button>
          <button
            onClick={() => setCurrentView('tics')}
            className="text-white hover:bg-green-500 hover:text-black dark:hover:bg-green-700 dark:hover:text-white px-4 py-2 rounded-md transition-all">
            TICS
          </button>
        </div>

        {/* Botón de modo nocturno */}
        <button
          onClick={toggleDarkMode}
          className="ml-4 text-white hover:text-black dark:text-white px-4 py-2 bg-gray-800 dark:bg-green-800 rounded-md hover:bg-white dark:hover:bg-green-700 transition-all">
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
