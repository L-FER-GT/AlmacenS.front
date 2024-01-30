import React, {useState} from 'react';
import Home from './view/screen/home'; // Ajusta la ruta según la ubicación de tu componente Home
import Login from './view/screen/loginScreen';
import './App.css';

function App() {
  const [screenSelect, setScreenSelect]=useState('Home');
  return (
    <div className="App">
      {/* Contenido del componente Home */}
      {screenSelect=='Home' && <Home onHandleClick={setScreenSelect}/>}
      {screenSelect=='Login' && <Login />}
    </div>
  );
}

export default App;