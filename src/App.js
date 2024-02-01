import React, {useEffect, useState} from 'react';
import Home from './view/screen/home'; // Ajusta la ruta según la ubicación de tu componente Home
import Login from './view/screen/loginScreen';
import RegisterUser from './view/screen/register';
import { Container } from '@mui/material';
import axios from 'axios';
import './App.css';

function App() {
  const [screenSelect, setScreenSelect]=useState('NewUser');
  const [usuarios, setUsuarios] = useState([])

  const obtenerUsuarios = () => {
    axios
      .get("http://localhost:5000/listUsuarios")
      .then((response) => {
        const allUsers=response.data
        const userArray = allUsers.map(item => item.Usuario);
        setUsuarios(userArray)
      })
      .catch((error) => {
        console.error("Error al obtener datos desde el servidor: ", error);
      });
  };
  useEffect(() => {
    obtenerUsuarios();
  }, []);


  

  return (
    <div className="App">
      {/* Contenido del componente Home */}
      {screenSelect=='Home' && <Home onHandleClick={setScreenSelect}/>}
      {screenSelect=='Login' && <Login users={usuarios}/>}
      {screenSelect=='NewUser' && <RegisterUser onChangeScreen={setScreenSelect} users={usuarios}/>}
    </div>
  );
}

export default App;